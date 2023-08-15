const express = require("express");
const router = express.Router();
const indexLeafyRouter = require("./v1/leafy/index");
const indexMentorRouter = require("./v1/mentorship/index");

router.use("/v1", indexLeafyRouter);
router.use("/v1", indexMentorRouter);

module.exports = router;
