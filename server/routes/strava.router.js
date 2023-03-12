const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const axios = require("axios");

/**
 * GET route template
 */
router.get("/", (req, res) => {
	// GET route code here
	console.log("got to api/strava-auth");
	console.log(req.query);
	console.log(req.user);
	console.log("scope", typeof req.query.scope);

	if (!/read,activity:read_all/.test(req.query.scope)) {
		console.log("scope not authenticated");
		res.status(301).redirect("http://localhost:3000/connected-apps");
	}

	const params = {
		client_id: process.env.STRAVA_CLIENT_ID,
		client_secret: process.env.STRAVA_CLIENT_SECRET,
		code: req.query.code,
		grant_type: "authorization_code",
	};

	axios
		.post("https://www.strava.com/oauth/token", {}, { params })
		.then((response) => {
			console.log(response.data);
		})
		.catch((error) => {
			console.log(
				"Error with getting access token /api/strava-auth",
				error
			);
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
