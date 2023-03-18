const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const stripe = require("stripe")(process.env.STRIPE_TEST_LIVE_KEY);
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

/**
 * This is the endpoint that creates the stripe url that I then send back to the client
 */
router.post(
	"/create-checkout-session",
	rejectUnauthenticated,
	async (req, res) => {
		const metadata = req.body;
		metadata.user_id = req.user.id;

		try {
			const session = await stripe.checkout.sessions.create({
				line_items: [{ price: process.env.PRODUCT_TEST_KEY }],
				mode: "subscription",
				// success.html?session_id={CHECKOUT_SESSION_ID}
				success_url: "http://localhost:3000/#/?success=true",
				cancel_url: "http://localhost:3000/#/?canceled=true",
				metadata,
			});

			res.status(202);
			res.send({ url: session.url }); // client will re-route the window to this url
		} catch (error) {
			console.log(error);
			res.sendStatus(400);
		}
	}
);

/**
 * Stripe will notify me at this endpoint when an event happens on my account
 */
router.post("/webhook", async (req, res) => {
	// finding the data needed to reconstruct the request event
	const payload = req.rawBody;
	const sig = req.headers["stripe-signature"];
	const endpointSecret = process.env.WEBHOOK_SIGNING_SECRET;

	let event;

	// checking if the reconstructed event matches the original request
	// with the request signature
	try {
		event = stripe.webhooks.constructEvent(payload, sig, endpointSecret);
	} catch (error) {
		console.log(error.message);
		res.status(400).json({ success: false });
		return;
	}

	/**
	 * To allow for a end-date to be added to a subscription you have to add
	 * subscriptionSchedules to the original subscription via phases
	 */
	if (event.type === "checkout.session.completed") {
		const checkoutSession = event.data.object;

		// create a schedule and add it to the original subscription
		let schedule = await stripe.subscriptionSchedules.create({
			from_subscription: checkoutSession.subscription,
		});

		// reconstruct current phases from the subscription to use in the update
		const phases = schedule.phases.map((phase) => ({
			start_date: phase.start_date,
			end_date: phase.end_date,
			items: phase.items,
		}));

		//
		schedule = await stripe.subscriptionSchedules.update(schedule.id, {
			end_behavior: "cancel", // cancels subscription after phase end-date
			phases: [
				...phases, // old phases
				{
					items: [{ price: process.env.PRODUCT_TEST_KEY }], // same product
					end_date: Math.floor(
						new Date("2023-03-25").getTime() / 1000 // 1 day after the end of the cohort
					),
				},
			],
		});

		// INSERTING CHECKOUT METADATA INTO DATABASE
		const subscription = await stripe.subscriptions.retrieve(
			checkoutSession.subscription
		);
		const subscription_id = subscription.items.data[0].id;
		let { dates, cohort_id, user_id } = checkoutSession.metadata;
		dates = JSON.parse(dates); // object was stringified before sending

		const connection = await pool.connect();

		try {
			await connection.query("BEGIN");
			// First: insert instance of user joining cohort in "users_cohorts"
			const joinCohortInsertion = `
				INSERT INTO "users_cohorts" ("user_id", "cohort_id", "subscription_id", "daily_stake") 
				VALUES ($1, $2, $3, $4) RETURNING "id";
			`;
			const joinResponse = await connection.query(joinCohortInsertion, [
				user_id,
				cohort_id,
				subscription_id,
				1,
			]);
			// Second:
			const joinedCohortId = joinResponse.rows[0].id; // from RETURNING in last query
			const trainingsInsertion = `INSERT INTO "training_planned" ("users_cohorts_id", "date", "miles_planned") VALUES ($1, $2, $3);`;
			await Promise.all(
				Object.keys(dates).map((date) => {
					connection.query(trainingsInsertion, [
						joinedCohortId,
						date,
						dates[date], // number miles
					]);
				})
			);

			await connection.query("COMMIT");
		} catch (error) {
			await connection.query("ROLLBACK");
			console.log(`Transaction Error - Rolling back new account`, error);
			res.sendStatus(500);
		} finally {
			connection.release();
		}
	}
	res.status(200).json({ success: true });
});

module.exports = router;
