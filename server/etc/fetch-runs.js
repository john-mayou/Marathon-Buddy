const pool = require("../modules/pool");
const axios = require("axios");
const dayjs = require("dayjs");
const utc = require("dayjs/plugin/utc");
dayjs.extend(utc);
require("dotenv").config();

/**
 * This function takes all of the training instances of the training_planned events for the day before
 * and fetches the actual mileage from Strava. Put the total miles ran into the database to validate later.
 */
async function fetchPlannedTrainings() {
	const connection = await pool.connect();
	const yesterday = dayjs().add(-1, "day").format("YYYY-MM-DD");

	const trainigsQuery = `
        SELECT tp.users_cohorts_id, tp.date, st.access_token FROM "users_cohorts" AS uc
        JOIN "training_planned" AS tp ON tp.users_cohorts_id = uc.id
        JOIN "strava_tokens" AS st ON st.user_id = uc.user_id
        WHERE tp.date::date = $1;
    `;

	const activeUserTokensQuery = `
        SELECT uc.user_id, st.refresh_token FROM "users_cohorts" AS uc
        JOIN "training_planned" AS tp ON tp.users_cohorts_id = uc.id
        JOIN "strava_tokens" AS st ON st.user_id = uc.user_id
        WHERE tp.date::date = $1;
    `;

	try {
		await connection.query("BEGIN");
		// First: query all active user refresh_tokens
		const activeTokens = await connection.query(activeUserTokensQuery, [
			yesterday,
		]);
		// Second: refresh those tokens for new refresh and access tokens
		await Promise.all(
			activeTokens.rows.map(async (user) => {
				const newTokenParams = {
					client_id: process.env.STRAVA_CLIENT_ID,
					client_secret: process.env.STRAVA_CLIENT_SECRET,
					refresh_token: user.refresh_token,
					grant_type: "refresh_token",
				};
				const newTokens = await axios.post(
					"https://www.strava.com/oauth/token",
					{},
					{ params: newTokenParams }
				);
				console.log("NEW TOKENS HERE:", newTokens.data);
				const updateTokenQuery = `
                    UPDATE "strava_tokens" SET "refresh_token"=$1, "access_token"=$2 WHERE "id"=$3;
                `;
				// update database with new tokens
				await connection.query(updateTokenQuery, [
					newTokens.data.refresh_token,
					newTokens.data.access_token,
					user.user_id,
				]);
			})
		);
		// Third: query all of yersterdays trainings
		const trainings = await connection.query(trainigsQuery, [yesterday]);
		// Fourth: fetch actual training data from Strava
		await Promise.all(
			trainings.rows.map(async (training) => {
				const userActivities = await axios.get(
					"https://www.strava.com/api/v3/athlete/activities",
					{
						params: {
							before: dayjs(yesterday).unix() + 86400,
							after: dayjs(yesterday).unix(),
							access_token: training.access_token,
						},
					}
				);
				const runningActivities = userActivities.data.filter(
					(activity) => activity.sport_type === "Run"
				);
				const totalMiles = runningActivities.reduce(
					(total, activity) => total + activity.distance,
					0
				);
				const actualTrainingInsertion = `
                    INSERT INTO "training_actual" ("users_cohorts_id", "date", "miles_actual")
                    VALUES($1, $2, $3);
                `;
				// Insert those actual mileage ran into the database
				await connection.query(actualTrainingInsertion, [
					training.users_cohorts_id,
					training.date,
					totalMiles,
				]);
			})
		);

		await connection.query("COMMIT");
	} catch (error) {
		await connection.query("ROLLBACK");
		console.log(`Transaction Error - Rolling back new account`, error);
	} finally {
		connection.release();
	}
}

fetchPlannedTrainings();
