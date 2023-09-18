const express = require("express");
const router = express.Router();

const userRouter = require("./student");
const guideRouter = require("./guide");
const collegeRouter = require("./college");
const studentGuideRouter = require("./student_guide");

router.use("/student", userRouter);
router.use("/guide", guideRouter);
router.use("/college", collegeRouter);
router.use("/student-guide", studentGuideRouter);

module.exports = router;
