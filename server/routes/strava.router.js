const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

router.get("/", async (req, res) => {
	// if proper scopes were not authorized, break and redirect back to apps page
	if (!/read,activity:read_all/.test(req.query.scope)) {
		res.status(301).redirect("http://localhost:3000/#/connected-apps");
		return;
	}

	const userId = req.user.id;
	const tokenExchangeParams = {
		client_id: process.env.STRAVA_CLIENT_ID,
		client_secret: process.env.STRAVA_CLIENT_SECRET,
		code: req.query.code,
		grant_type: "authorization_code",
	};

	const connection = await pool.connect();

	try {
		await connection.query("BEGIN");
		// First: exchange the code from the url for a access_token/refresh_token
		const exchangeResponse = await axios.post(
			"https://www.strava.com/oauth/token",
			{},
			{ params: tokenExchangeParams }
		);
		// Second: insert refresh token into database
		const tokenInsertion = `INSERT INTO "strava_tokens" ("user_id", "refresh_token", "access_token") VALUES ($1, $2, $3);`;
		await connection.query(tokenInsertion, [
			userId,
			exchangeResponse.data.refresh_token,
			exchangeResponse.data.access_token,
		]);
		// Third: updates user "strava_connected" flag to false
		const stravaToggleQuery = `UPDATE "users" SET "strava_connected"=true WHERE "id"=$1;`;
		await connection.query(stravaToggleQuery, [userId]);

		await connection.query("COMMIT");
		res.status(201).redirect("http://localhost:3000/#/connected-apps");
	} catch (error) {
		await connection.query("ROLLBACK");
		console.log(`Transaction Error - Rolling back new account`, error);
		res.status(500).redirect("http://localhost:3000/#/connected-apps");
	} finally {
		connection.release();
	}
});

router.delete("/", async (req, res) => {
	const userId = req.user.id;
	const connection = await pool.connect();

	try {
		await connection.query("BEGIN");
		// First: removes strava refresh token
		const deletionQuery = `DELETE FROM "strava_tokens" WHERE "user_id"=$1;`;
		await connection.query(deletionQuery, [userId]);

		// Second: update user "strava_connected" flag to false
		const updateUserQuery = `UPDATE "users" SET "strava_connected"=false WHERE "id"=$1;`;
		await connection.query(updateUserQuery, [userId]);

		await connection.query("COMMIT");
		res.sendStatus(204);
	} catch (error) {
		await connection.query("ROLLBACK");
		console.log(`Transaction Error - Rolling back new account`, error);
		res.sendStatus(500);
	} finally {
		connection.release();
	}
});

module.exports = router;
