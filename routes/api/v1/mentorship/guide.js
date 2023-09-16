const express = require("express");
const guideController = require("../../../../src/controllers/mentorship/guide/guide.controller");

const router = express.Router();

router.post("/login", guideController.login);
router.post("/register", guideController.register);
router.get("/get-guide/:id", guideController.getGuideById);
router.get("/get-all-guide", guideController.getGuides);
router.put("/update/:id", guideController.update);

module.exports = router;
