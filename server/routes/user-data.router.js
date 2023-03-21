const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", rejectUnauthenticated, async (req, res) => {
	// finds cohorts the user was a part of and returns them
	const userCohortDataQuery = `
        SELECT
			cohorts.name,
			cohorts.start_date,
			uc.daily_stake,
			uc.duration,
			JSON_AGG(JSON_BUILD_OBJECT('date', tp.date, 'planned', tp.miles_planned)) AS "planned",
			JSON_AGG(JSON_BUILD_OBJECT('date', ta.date, 'actual', ta.miles_actual)) AS "actual",
			JSON_AGG(JSON_BUILD_OBJECT('date', charges.date, 'charge', charges.amount)) AS "charge"
		FROM "users_cohorts" AS uc
		LEFT JOIN "training_planned" AS tp ON tp.users_cohorts_id = uc.id
		LEFT JOIN "training_actual" AS ta ON ta.users_cohorts_id = uc.id
		LEFT JOIN "charges" ON charges.users_cohorts_id = uc.id
		JOIN "cohorts" ON cohorts.id = uc.cohort_id
		WHERE uc.user_id = $1
		GROUP BY cohorts.name, cohorts.start_date, uc.daily_stake, uc.duration, uc.user_id
		ORDER BY cohorts.start_date DESC;
    `;
	const connection = await pool.connect();

	try {
		await connection.query("BEGIN");
		// First: find the users active cohort based on
		const userCohortData = await connection.query(userCohortDataQuery, [
			req.user.id,
		]);

		await connection.query("COMMIT");
		res.send(userCohortData.rows);
	} catch (error) {
		await connection.query("ROLLBACK");
		console.log(`Transaction Error - Rolling back new account`, error);
		res.sendStatus(500);
	} finally {
		connection.release();
	}
});

module.exports = router;
