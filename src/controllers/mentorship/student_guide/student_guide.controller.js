const db = require("../../../models");
const StudentGuide = db.StudentGuide;
const { Op } = require("sequelize");

const studentGuideController = {};
// Choosed guide by student and schedule meeting
studentGuideController.chooseGuide = async (req, res) => {
  const responseData = {
    msg: "Error in choose guide",
    success: false,
    result: "Empty",
  };
  const { studentId, guideId } = req.body;
  const student = await db.Student.findByPk(studentId);
  const mentor = await db.Guide.findByPk(guideId);
  if (!student || !mentor) {
    return res.status(404).json({ error: "Student or Guide not found" });
  }

  try {
    const studentGuide = await StudentGuide.create({
      ...req.body,
    });
    if (studentGuide) {
      return res
        .status(200)
        .send({ success: true, studentGuide: studentGuide });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Something went wrong" });
    }
  } catch (error) {
    responseData.result = error;
    console.log(error);
    return res.status(400).send(responseData);
  }
};

// get all the student by mentor id
studentGuideController.getStudentsByGuideId = async (req, res) => {
  console.log("Id--->", req.params.id);
  const responseData = {
    msg: "Error in getting data",
    success: false,
    result: "Empty",
  };
  try {
    const students = await StudentGuide.findAll({
      where: {
        guideId: req.params.id,
      },
      include: [
        {
          model: db.Student,
        },
      ],
    });
    if (students) {
      return res.status(200).send({ success: true, students: students });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    responseData.result = error;
    return res.status(400).send(responseData);
  }
};

// get all the mentor by student id
studentGuideController.getGuidesByStudentId = async (req, res) => {
  console.log("Id--->", req.params.id);
  const responseData = {
    msg: "Error in getting data",
    success: false,
    result: "Empty",
  };
  try {
    const guides = await StudentGuide.findAll({
      where: {
        studentId: req.params.id,
      },
      include: [
        {
          model: db.Guide,
        },
      ],
    });
    if (guides) {
      return res.status(200).send({ success: true, guides: guides });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    responseData.result = error;
    return res.status(400).send(responseData);
  }
};

// Update studentGuide table
studentGuideController.updateStudentGuide = async (req, res) => {
  console.log("Id--->", req.params.id);
  const responseData = {
    msg: "Error in updating data",
    success: false,
    result: "Empty",
  };
  try {
    const studentGuide = await StudentGuide.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (studentGuide) {
      for (let i = 0; i < Object.keys(req.body).length; i++) {
        studentGuide[Object.keys(req.body)[i]] = Object.values(req.body)[i];
      }
      await studentGuide.save();
      return res
        .status(200)
        .send({ success: true, studentGuide: studentGuide });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Something went wrong" });
    }
  } catch (error) {
    console.log(error);
    responseData.result = error;
    return res.status(400).send(responseData);
  }
};

module.exports = studentGuideController;
