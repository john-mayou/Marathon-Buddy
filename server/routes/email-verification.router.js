const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const crypto = require("crypto");

// mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/confirmation/:email/:code", async (req, res) => {
	const { email, code } = req.params;

	const doesCodeExistQuery = `
		SELECT EXISTS(SELECT 1 FROM "email_otps" WHERE "email"=$1 AND "code"=$2) AS "exists";
	`;

	await pool
		.query(doesCodeExistQuery, [email, code])
		.then((result) => {
			const changeUserToVerified = `
				UPDATE "users" SET "email_verified"=true WHERE "email"=$1;
			`;

			if (result.rows[0].exists) {
				pool.query(changeUserToVerified, [email]);
			}
		})
		.catch((error) => {
			console.log("Error with checking if email code exists", error);
		});

	res.status(301).redirect("http://localhost:3000/login");
});

router.post("/:email", async (req, res) => {
	const userEmail = req.params.email;
	const randomCode = crypto.randomBytes(16).toString("hex");
	const expirationTimestamp = Date.now() + 3600;

	const msg = {
		to: "john@johnmayou.com",
		from: "john@marathonbuddy.co",
		subject: "Marathon Buddy Email Verification",
		text:
			"Hello!\n\nPlease verify your account by clicking the link:\n" +
			`http://localhost:5000/api/verify-email/confirmation/${userEmail}/${randomCode}` +
			"\n\nThank You!\n",
		html:
			"Hello!\n\nPlease verify your account by clicking the link:\n" +
			`http://localhost:5000/api/verify-email/confirmation/${userEmail}/${randomCode}` +
			"\n\nThank You!\n",
	};

	const codeInsertion = `
		INSERT INTO "email_otps" ("email", "code")
		VALUES ($1, $2);
	`;

	pool.query(codeInsertion, [userEmail, randomCode])
		.then(async () => {
			try {
				await sgMail.send(msg);
				res.sendStatus(201);
			} catch (error) {
				console.log("Error sending email to user", error);
			}
		})
		.catch((error) => {
			console.log(`Error with insertion ${codeInsertion}`, error);
			res.sendStatus(500);
		});
});

module.exports = router;
