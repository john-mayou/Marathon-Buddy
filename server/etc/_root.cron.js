const fetchTrainingsWorkflow = require("./fetch-runs");
const sendStripeUsage = require("./send-usage");
const sendDailyEmails = require("./daily-emails");

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

dailyCronWorkflow();
