const fetchTrainingsWorkflow = require("./fetch-runs");
const sendStripeUsage = require("./send-usage");
const sendDailyEmails = require("./daily-emails");

/**
 * Aggregator cron function that the cron will run everyday at a given time
 */
async function dailyCronWorkflow() {
	try {
		await fetchTrainingsWorkflow();
		await sendStripeUsage();
		await sendDailyEmails();
		console.info("success");
	} catch (e) {
		console.error(e);
	}
}

// dailyCronWorkflow(); // for cron purposes

module.exports = dailyCronWorkflow;
