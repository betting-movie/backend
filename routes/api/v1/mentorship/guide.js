const express = require("express");
const guideController = require("../../../../src/controllers/mentorship/guide/guide.controller");
const {
  isAuthenticated,
} = require("../../../../src/middlewares/authentication");
const roles = require("../../../../src/utils/roles");

const router = express.Router();

router.post("/login", guideController.login);
router.post("/register", guideController.register);
router.get(
  "/get-guide/:id",
  // isAuthenticated([roles.MENTOR, roles.STUDENT]),
  guideController.getGuideById
);
router.get("/get-all-guide", guideController.getGuides);
router.put(
  "/update/:id",
  // isAuthenticated([roles.MENTOR]),
  guideController.update
);

module.exports = router;
