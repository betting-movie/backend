const express = require("express");
const router = express.Router();

const userRouter = require("./student");
const guideRouter = require("./guide");
const collegeRouter = require("./college");

router.use("/student", userRouter);
router.use("/guide", guideRouter);
router.use("/college", collegeRouter);

module.exports = router;
