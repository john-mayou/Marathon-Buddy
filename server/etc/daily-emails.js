const pool = require("../modules/pool");
const axios = require("axios");
const dayjs = require("dayjs");
require("dotenv").config();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_DAILY_EMAIL_KEY);

/**
 * Sends the user a daily email with information about the previos days training.
 * @returns promise
 */
function sendDailyEmails() {
	return new Promise(async (resolve, reject) => {
		const yesterday = dayjs().add(-1, "day").format("YYYY-MM-DD");

		const userUpdateQuery = `
			SELECT
				u.email,  
				tp.date, 
				tp.miles_planned, 
				ta.miles_actual, 
				c.amount AS charge_amount 
			FROM "users_cohorts" AS uc
				JOIN "users" AS u ON uc.user_id = u.id
				JOIN "training_planned" AS tp ON tp.users_cohorts_id = uc.id
				JOIN "training_actual" AS ta ON ta.users_cohorts_id = uc.id AND ta.date = tp.date
				JOIN "charges" AS c ON c.users_cohorts_id = uc.id AND c.date = ta.date AND c.date = tp.date
			WHERE tp.date::date = $1;
		`;

		const formulateMessage = (charge) => {
			return charge > 0
				? "Oh no! You missed yesterdays training!"
				: "You won back your stake!";
		};

		try {
			const userUpdates = await pool.query(userUpdateQuery, [yesterday]);

			// Sending personalized emails to all users about yesterdays trainings
			await Promise.all(
				userUpdates.rows.map((data) =>
					sgMail.send({
						to: "john@johnmayou.com",
						from: "john@marathonbuddy.co",
						text: "This email is not able to be seen on this device",
						html: "<strong>This email is not able to be seen on this device</strong>",
						template_id: "d-456091a1410846ccaaa8784a6642fe76",
						dynamic_template_data: {
							date: dayjs(data.date).format("ddd MMMM D"),
							planned: data.miles_planned,
							actual: data.miles_actual,
							message: formulateMessage(data.charge_amount),
							charge: data.charge_amount,
						},
					})
				)
			);

			resolve();
		} catch (error) {
			console.error("Error sending emails to users", error);
			reject();
		}
	});
}

module.exports = sendDailyEmails;
