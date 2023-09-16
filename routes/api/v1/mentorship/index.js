const express = require("express");
const router = express.Router();

const userRouter = require("./student");
const guideRouter = require("./guide");

router.use("/student", userRouter);
router.use("/guide", guideRouter);

module.exports = router;
