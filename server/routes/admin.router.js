const express = require("express");
const pool = require("../modules/pool");
const router = express.Router();
const {
	rejectUnauthenticated,
	rejectIfNotAdmin,
} = require("../modules/authentication-middleware");

/**
 * GET route template
 */
router.get("/", rejectUnauthenticated, rejectIfNotAdmin, (req, res) => {
	res.send("/api/admin working");
});

/**
 * POST route template
 */
router.post("/", (req, res) => {
	// POST route code here
});

module.exports = router;
