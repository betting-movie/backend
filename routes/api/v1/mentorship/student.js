const express = require("express");
const studentController = require("../../../../src/controllers/mentorship/student/student.controller");

const router = express.Router();

router.post("/login", studentController.login);
router.post("/register", studentController.register);
router.get("/get-student/:id", studentController.getStudentById);
router.get("/get-all-student", studentController.getStudents);
router.put("/update/:id", studentController.update);

module.exports = router;
