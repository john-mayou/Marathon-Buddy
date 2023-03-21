const passport = require("passport");
const LocalStrategy = require("passport-local").Strategy;
const encryptLib = require("../modules/encryption");
const pool = require("../modules/pool");
const dayjs = require("dayjs");

passport.serializeUser((user, done) => {
	done(null, user.id);
});

passport.deserializeUser((id, done) => {
	const today = dayjs().format("YYYY-MM-DD");

	/**
	 * This query will have performance considerations at scale as this will be run
	 * everytime the page loads. A better way would be to set up a daily cron job to
	 * update a table with a list of user_id and is_active flag. This would save on
	 * app efficiency as it would not have to join tables for every 'user' selection
	 */
	pool.query(
		`SELECT 
			u.*, 
			EXISTS(
				SELECT *
				FROM "users_cohorts" AS uc
				JOIN "training_planned" AS tp ON tp.users_cohorts_id = uc.id
				WHERE tp.date::date >= $1 AND uc.user_id = $2
			) AS "is_active"
		FROM users AS u 
		WHERE u.id = $2;`,
		[today, id]
	)
		.then((result) => {
			// Handle Errors
			const user = result && result.rows && result.rows[0];

			if (user) {
				// user found
				delete user.password; // remove password so it doesn't get sent
				// done takes an error (null in this case) and a user
				done(null, user);
			} else {
				// user not found
				// done takes an error (null in this case) and a user (also null in this case)
				// this will result in the server returning a 401 status code
				done(null, null);
			}
		})
		.catch((error) => {
			console.log("Error with query during deserializing user ", error);
			// done takes an error (we have one) and a user (null in this case)
			// this will result in the server returning a 500 status code
			done(error, null);
		});
});

// Does actual work of logging in
passport.use(
	"local",
	new LocalStrategy(
		{ usernameField: "email", passwordField: "password" },
		(email, password, done) => {
			pool.query('SELECT * FROM "users" WHERE email = $1', [email])
				.then((result) => {
					const user = result && result.rows && result.rows[0];
					if (
						user &&
						encryptLib.comparePassword(password, user.password)
					) {
						// All good! Passwords match!
						// done takes an error (null in this case) and a user
						done(null, user);
					} else {
						// Not good! email and password do not match.
						// done takes an error (null in this case) and a user (also null in this case)
						// this will result in the server returning a 401 status code
						done(null, null);
					}
				})
				.catch((error) => {
					console.log("Error with query for user ", error);
					// done takes an error (we have one) and a user (null in this case)
					// this will result in the server returning a 500 status code
					done(error, null);
				});
		}
	)
);

module.exports = passport;
