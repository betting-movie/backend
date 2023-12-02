const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const treeType = require("./treeType");
const treeReview = require("./treeReview");

router.use("/user", userRouter);
router.use("/tree-type", treeType);
router.use("/tree-review", treeReview);

module.exports = router;
