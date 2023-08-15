const express = require("express");
const router = express.Router();

const userRouter = require("./student");

router.use("/student", userRouter);

module.exports = router;
