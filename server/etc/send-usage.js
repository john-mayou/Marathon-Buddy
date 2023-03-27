const pool = require("../modules/pool");
const axios = require("axios");
const dayjs = require("dayjs");
// const utc = require("dayjs/plugin/utc");
// dayjs.extend(utc);
require("dotenv").config();
const stripe = require("stripe")(process.env.STRIPE_TEST_LIVE_KEY);

/**
 *
 * @returns promise
 */
function sendStripeUsage() {
	return new Promise(async (resolve, reject) => {
		const connection = await pool.connect();
		const yesterday = dayjs().add(-1, "day").format("YYYY-MM-DD");

		const trainingDataQuery = `
			SELECT 
				uc.id, 
				tp.date, 
				tp.miles_planned, 
				ta.miles_actual, 
				uc.subscription_id, 
				uc.daily_stake 
			FROM "users_cohorts" AS uc
				JOIN "training_planned" AS tp ON tp.users_cohorts_id = uc.id
				JOIN "training_actual" AS ta ON ta.users_cohorts_id = uc.id
			WHERE tp.date::date = $1 AND ta.date::date = $1;
		`;

		try {
			await connection.query("BEGIN");

			// First: get training data to later compare
			const trainingsToCalculate = await connection.query(
				trainingDataQuery,
				[yesterday]
			);

			// Second: calculate amount to charge (either 1 or 0 units: $25.00 per unit)
			const usageCharges = trainingsToCalculate.rows.map((training) => ({
				...training,
				amount:
					training.miles_actual >= training.miles_planned
						? 0
						: training.daily_stake,
			}));

			// Third: send stripe the usage data
			await Promise.all(
				usageCharges.map((charge) =>
					stripe.subscriptionItems.createUsageRecord(
						charge.subscription_id,
						{
							action: "set", // protects against sending usage data multiple times
							quantity: charge.amount,
						}
					)
				)
			);

			// Fourth: insert charges into database
			const chargeInsertion = `INSERT INTO "charges" ("users_cohorts_id", "date", "amount") VALUES ($1, $2, $3)`;
			await Promise.all(
				usageCharges.map((charge) =>
					connection.query(chargeInsertion, [
						charge.id,
						charge.date,
						charge.amount,
					])
				)
			);

			await connection.query("COMMIT");
			resolve();
		} catch (error) {
			await connection.query("ROLLBACK");
			console.log(`Transaction Error - Rolling back new account`, error);
			reject();
		} finally {
			connection.release();
		}
	});
}

module.exports = sendStripeUsage;
