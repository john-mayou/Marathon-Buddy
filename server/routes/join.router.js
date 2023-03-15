const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
} = require("../modules/authentication-middleware");

router.get("/", (req, res) => {
	// GET route code here
});

router.post("/", rejectUnauthenticated, (req, res) => {
	const { dates, cohort_id } = req.body;

	const joinCohortInsertion = `
        INSERT INTO "users_cohorts" ("user_id", "cohort_id")
        VALUES ($1, $2) RETURNING "id";
    `;

	pool.query(joinCohortInsertion, [req.user.id, cohort_id])
		.then((result) => {
			const createdCohortInstance = result.rows[0].id;

			const plannedTrainingsInsertion = `
                INSERT INTO "training_planned" ("users_cohorts_id", "date", "miles_planned")
                VALUES ($1, $2, $3);
            `;

			Promise.all(
				Object.keys(dates).map((date) => {
					pool.query(plannedTrainingsInsertion, [
						createdCohortInstance,
						date,
						dates[date],
					]);
				})
			).then(() => {
				res.sendStatus(201);
			});
		})
		.catch((error) => {
			console.log(`Error making query ${joinCohortInsertion}`, error);
			res.sendStatus(500);
		});
});

module.exports = router;
