const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

/**
 * GET route template
 */
router.get("/", (req, res) => {
	// if proper scopes were not authorized, break and redirect back to apps page
	if (!/read,activity:read_all/.test(req.query.scope)) {
		res.status(301).redirect("http://localhost:3000/connected-apps");
	}

	const tokenExchangeParams = {
		client_id: process.env.STRAVA_CLIENT_ID,
		client_secret: process.env.STRAVA_CLIENT_SECRET,
		code: req.query.code,
		grant_type: "authorization_code",
	};

	axios
		.post(
			"https://www.strava.com/oauth/token",
			{},
			{ params: tokenExchangeParams }
		)
		.then((tokenExchangeResponse) => {
			// STRAVA_TOKENS INSERTION
			const stravaTableInsertion = `
				INSERT INTO "strava_tokens" ("user_id", "refresh_token")
				VALUES ($1, $2);
			`;

			pool.query(stravaTableInsertion, [
				req.user.id,
				tokenExchangeResponse.data.refresh_token,
			]);

			// USERS TABLE UPDATE
			const userStravaConnectionQuery = `
				UPDATE "users" SET "strava_connected"=true WHERE "id"=$1;
			`;

			pool.query(userStravaConnectionQuery, [req.user.id]);
		})
		.catch((error) => {
			console.log("Error exchanging access token", error);
			res.send(500).redirect("http://localhost:3000/connected-apps");
		});

	res.status(301).redirect("http://localhost:3000/connected-apps");
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
	// POST route code here
});

module.exports = router;
