const db = require("../../../models");
const Student = db.Student;
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../../config/jwt.config");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

const studentController = {};

// Student registration
studentController.register = async (req, res) => {
  const { email, phone_number, password } = req.body;

  const responseData = {
    msg: "Error in register",
    success: false,
    result: "Empty",
  };
  try {
    const existingStudent = await Student.findOne({
      where: {
        [Op.or]: [{ email }, { phone_number }],
      },
    });

    if (existingStudent) {
      return res
        .status(409)
        .json({ success: false, msg: "Email or mobile already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const student = await Student.create({
      name: req.body.name,
      email: req.body.email,
      phone_number: phone_number,
      password: hashedPassword,
    });
    if (student) {
      return res.status(200).send({
        success: true,
        student,
        msg: "student registered successfully",
      });
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

// Student login
studentController.login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).send("Email and password are required");
  }
  const responseData = {
    msg: "Error in login",
    success: false,
    result: "Empty",
  };
  try {
    console.log(req.body);
    const student = await Student.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!bcrypt.compareSync(req.body.password, student.password)) {
      return res
        .status(401)
        .send({ success: false, msg: "Invalid email or password" });
    } else if (bcrypt.compareSync(req.body.password, student.password)) {
      return res.status(200).send({
        success: true,
        student: { ...student.dataValues },
        token: jwt.sign(JSON.stringify(student), jwtConfig.secret),
      });
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

// Student Update
studentController.update = async (req, res) => {
  const responseData = {
    msg: "Error in updating student",
    success: false,
    result: "Empty",
  };
  try {
    let student = await Student.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (student) {
      for (let i = 0; i < Object.keys(req.body).length; i++) {
        student[Object.keys(req.body)[i]] = Object.values(req.body)[i];
      }
      await student.save();
      return res.status(200).send({ success: true, student: student });
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

// Get student by id--> passed in params
studentController.getStudentById = async (req, res) => {
  const responseData = {
    msg: "Error in getting getting student",
    success: false,
    result: "Empty",
  };
  try {
    const student = await Student.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (student) {
      return res.status(200).send({ success: true, student: student });
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

// /Getting all the students present in DB
studentController.getStudents = async (req, res) => {
  const responseData = {
    msg: "Error in getting getting students",
    success: false,
    result: "Empty",
  };

  const student = await Student.findAll();
  try {
    if (student) {
      return res.status(200).send({ success: true, student: student });
    } else {
      return res
        .status(400)
        .send({ success: false, msg: "Something went wrong" });
    }
  } catch (error) {
    console.log({ error });
    responseData.result = error;
    return res.status(400).send(responseData);
  }
};
module.exports = studentController;
