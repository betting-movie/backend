const express = require("express");
const studentController = require("../../../../src/controllers/mentorship/student/student.controller");
const {
  isAuthenticated,
} = require("../../../../src/middlewares/authentication");
const roles = require("../../../../src/utils/roles");

const router = express.Router();

router.post("/login", studentController.login);
router.post("/register", studentController.register);
router.get(
  "/get-student/:id",
  isAuthenticated,
  studentController.getStudentById
);
router.get("/get-all-student", studentController.getStudents);
router.put("/update/:id", isAuthenticated, studentController.update);

module.exports = router;
