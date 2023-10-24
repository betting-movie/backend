const express = require("express");
const collegeController = require("../../../../src/controllers/mentorship/college/college.controller");

const router = express.Router();

router.post("/post-college", collegeController.registeredCollege);
router.get("/get-colleges", collegeController.getAllColleges)

module.exports = router;