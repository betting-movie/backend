const express = require("express");
const studentGuideController = require("../../../../src/controllers/mentorship/student_guide/student_guide.controller");
const router = express.Router();
router.post("/choose-guide", studentGuideController.chooseGuide);
router.get(
  "/get-students-by-guideId/:id",
  studentGuideController.getStudentsByGuideId
);
router.get(
  "/get-guides-by-studentId/:id",
  studentGuideController.getGuidesByStudentId
);
router.put(
  "/update-student-guide-mapping/:id",
  studentGuideController.updateStudentGuide
);

module.exports = router;
