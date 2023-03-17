const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const crypto = require("crypto");

// mail
const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

router.get("/confirmation/:email/:code", async (req, res) => {
	const { email, code } = req.params;

	const connection = await pool.connect();

	try {
		await connection.query("BEGIN");
		// First: check if the email and code exists in the otps table
		const doesCodeExistQuery = `
			SELECT EXISTS(SELECT 1 FROM "email_otps" WHERE "email"=$1 AND "code"=$2) AS "exists";
		`;
		const existsResult = await pool.query(doesCodeExistQuery, [
			email,
			code,
		]);
		const exists = existsResult.rows[0].exists;

		// Second: if first query result is true, toggle users "email_verified"
		const changeUserToVerified = `UPDATE "users" SET "email_verified"=true WHERE "email"=$1;`;
		if (exists) {
			await pool.query(changeUserToVerified, [email]);
		}

		// end
		await connection.query("COMMIT");
		res.status(200).redirect("http://localhost:3000/#/login");
	} catch (error) {
		await connection.query("ROLLBACK");
		console.log("Transaction Error - Rolling back new account", error);
		res.status(500).redirect("http://localhost:3000/#/login");
	} finally {
		connection.release();
	}
});

router.post("/:email", async (req, res) => {
	const userEmail = req.params.email;
	const randomCode = crypto.randomBytes(16).toString("hex");

	const msg = {
		to: "john@johnmayou.com", // CHANGE LATER
		from: "john@marathonbuddy.co", // this email is verified
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

	const connection = await pool.connect();

	try {
		await connection.query("BEGIN");
		// insert created token and email into otps table
		const codeInsertion = `INSERT INTO "email_otps" ("email", "code") VALUES ($1, $2);`;
		await pool.query(codeInsertion, [userEmail, randomCode]);

		// then send the user an email with the verification link
		await sgMail.send(msg);

		await connection.query("COMMIT");
		res.status(201);
	} catch (error) {
		await connection.query("ROLLBACK");
		console.log("Transaction Error - Rolling back new account", error);
		res.status(500);
	} finally {
		connection.release();
	}
});

module.exports = router;
