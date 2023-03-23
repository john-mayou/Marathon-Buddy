const pool = require("../modules/pool");
const axios = require("axios");
const dayjs = require("dayjs");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

sendDailyEmails();

async function sendDailyEmails() {
	const connection = await pool.connect();

	const message = {
		to: "john@johnmayou.com", // Change to your recipient
		from: "john@marathonbuddy.co", // Change to your verified sender
		subject: "Sending with SendGrid is Fun",
		text: "and easy to do anywhere, even with Node.js",
		html: "<strong>and easy to do anywhere, even with Node.js</strong>",
	};

	try {
		await connection.query("BEGIN");

		sgMail
			.send(message)
			.then(() => console.log("Email sent"))
			.catch((error) => console.log("Error occured sending email"));

		await connection.query("COMMIT");
	} catch (error) {
		await connection.query("ROLLBACK");
		console.log(`Transaction Error - Rolling back new account`, error);
	} finally {
		connection.release();
	}
}
