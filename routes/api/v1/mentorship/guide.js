const express = require("express");
const guideController = require("../../../../src/controllers/mentorship/guide/guide.controller")
const router = express.Router();


router.post("/register", guideController.register);


module.exports = router;
