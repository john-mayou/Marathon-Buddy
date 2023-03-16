const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();

// mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/", (req, res) => {
	const msg = {
		to: "ferr0373@gmail.com",
		from: "john@marathonbuddy.co",
		subject: "Sent from Marathon Buddy",
		text: "this is the text body",
		html: "<strong>Working hard or hardly working?</strong>",
	};

	sgMail.send(msg);
	res.sendStatus(200);
});

router.post("/", (req, res) => {});

module.exports = router;
