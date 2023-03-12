const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
	rejectIfNotAdmin,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, rejectIfNotAdmin, (req, res) => {
	const cohortDataQuery = `
		SELECT "cohorts".id, "cohorts".name, "cohorts".start_date, 
		COUNT("users_cohorts".cohort_id) AS "users", "cohorts".is_current FROM "cohorts"
		LEFT JOIN "users_cohorts" ON "users_cohorts".cohort_id = "cohorts".id 
		GROUP BY "cohorts".id ORDER BY "cohorts".start_date ASC;
	`;

	pool.query(cohortDataQuery)
		.then((result) => {
			res.send(result.rows);
		})
		.catch((error) => {
			console.log(`Error making query ${cohortDataQuery}`, error);
			res.sendStatus(500);
		});
});

/**
 * POST route template
 */
router.post("/", rejectUnauthenticated, rejectIfNotAdmin, (req, res) => {
	const cohortInsertionText = `
		INSERT INTO "cohorts" ("name", "start_date")
		VALUES ($1, $2); 
	`;

	pool.query(cohortInsertionText, [req.body.name, req.body.start_date])
		.then(() => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.log(`Error making query ${cohortInsertionText}`, error);
			res.sendStatus(500);
		});
});

router.put("/:id", rejectUnauthenticated, rejectIfNotAdmin, (req, res) => {
	const updateCurrentCohortQuery = `
		UPDATE "cohorts" SET "is_current" = ("id" = $1);
	`;

	pool.query(updateCurrentCohortQuery, [req.params.id])
		.then(() => {
			res.sendStatus(201);
		})
		.catch((error) => {
			console.log(
				`Error making query ${updateCurrentCohortQuery}`,
				error
			);
			res.sendStatus(500);
		});
});

module.exports = router;
