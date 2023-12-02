const express = require("express");
const router = express.Router();

const userRouter = require("./user");
const treeType = require("./treeType");

router.use("/user", userRouter);
router.use("/tree-type", treeType);

module.exports = router;
