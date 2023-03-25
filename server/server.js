const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();

const sessionMiddleware = require("./modules/session-middleware");
const passport = require("./strategies/user.strategy");

// Route includes
const userRouter = require("./routes/user.router");
const cohortRouter = require("./routes/cohort.router");
const stravaRouter = require("./routes/strava.router");
const stripeRouter = require("./routes/stripe.router");
const emailVerificationRouter = require("./routes/email-verification.router");
const userDataRouter = require("./routes/user-data.router");

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(
	bodyParser.json({
		verify: (req, res, buf) => {
			req.rawBody = buf;
		},
	})
); // this is to get req.body as well as req.rawBody

// Passport Session Configuration //
app.use(sessionMiddleware);

// start up passport sessions
app.use(passport.initialize());
app.use(passport.session());

/* Routes */
app.use("/api/user", userRouter);
app.use("/api/cohort", cohortRouter);
app.use("/api/strava-auth", stravaRouter);
app.use("/api/stripe", stripeRouter);
app.use("/api/verify-email", emailVerificationRouter);
app.use("/api/user-data", userDataRouter);

// Serve static files
app.use(express.static("build"));

// App Set //
const PORT = process.env.PORT || 5000;

// Crons
// const cron = require("node-cron");
// const dailyCronWorkflow = require("./etc/_root.cron"); // Build path
// const frequency = "0 5 * * *";

// const initCrons = () => {
// 	if (cron.validate(frequency)) {
// 		cron.schedule(frequency, () => {
// 			dailyCronWorkflow();
// 		});
// 	}
// };

// initCrons(); // uncomment this line to start the cron

/** Listen * */
app.listen(PORT, () => {
	console.log(`Listening on port: ${PORT}`);
});
