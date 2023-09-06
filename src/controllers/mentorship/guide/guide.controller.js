const db = require("../../../models");
const Guide = db.Guide;
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../../config/jwt.config");
const bcrypt = require("bcrypt");

const guideController = {};


//Guide Sign up/ Register

guideController.register = async (req, res) => {
  const { email, phone_number, password } = req.body;

  const responseData = {
    msg: "Error in register",
    success: false,
    result: "Empty",
  };

  try {
    const existingGuide = await Guide.findOne({
      where: {
        [Op.or]: [{ email }, { phone_number }],
      },
    });

    if (existingGuide) {
      return res
        .status(409)
        .json({ success: false, msg: "Email or mobile already exists" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const guide = await Guide.create({
      name: req.body.name,
      email: req.body.email,
      phone_number: phone_number,
      password: hashedPassword,
    });

    if (guide) {
      return res.status(200).send({
        success: true,
        student,
        msg: "student registered successfully",
      });
    } else {
      return res.status(400).send({
        success: false,

        msg: "something went wrong",
      });
    }
  } catch (error) {
    responseData.result = error;
    console.log(error);
    return res.status(400).send(responseData);
  }
};


