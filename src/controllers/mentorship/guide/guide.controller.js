const db = require("../../../models");
const Guide = db.Guide;
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../../config/jwt.config");
const bcrypt = require("bcrypt");
const { Op } = require("sequelize");

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
    const hashedPassword = await bcrypt.hash(password, 12);
    const guide = await Guide.create({
      name: req.body.name,
      email: req.body.email,
      phone_number: phone_number,
      password: hashedPassword,
    });

    if (guide) {
      return res.status(200).send({
        success: true,
        guide,
        token: jwt.sign(JSON.stringify(guide), jwtConfig.secret),
        msg: "registered successfully",
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

// Guide login
guideController.login = async (req, res) => {
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
    const guide = await Guide.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!bcrypt.compareSync(req.body.password, guide.password)) {
      return res
        .status(401)
        .send({ success: false, msg: "Invalid email or password" });
    } else if (bcrypt.compareSync(req.body.password, guide.password)) {
      return res.status(200).send({
        success: true,
        guide: { ...guide.dataValues },
        token: jwt.sign(JSON.stringify(guide), jwtConfig.secret),
        msg: "login successfully",
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

// Guide Update
guideController.update = async (req, res) => {
  const responseData = {
    msg: "Error in updating",
    success: false,
    result: "Empty",
  };
  try {
    let guide = await Guide.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (guide) {
      for (let i = 0; i < Object.keys(req.body).length; i++) {
        guide[Object.keys(req.body)[i]] = Object.values(req.body)[i];
      }
      await guide.save();
      return res.status(200).send({ success: true, guide: guide });
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

// Get guide by id--> passed in params
guideController.getGuideById = async (req, res) => {
  const responseData = {
    msg: "Error in getting getting guide",
    success: false,
    result: "Empty",
  };
  try {
    const guide = await Guide.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (guide) {
      return res.status(200).send({ success: true, guide: guide });
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

// /Getting all the guide present in DB
guideController.getGuides = async (req, res) => {
  const responseData = {
    msg: "Error in getting getting guides",
    success: false,
    result: "Empty",
  };
  const guide = await Guide.findAll();
  try {
    if (guide) {
      return res.status(200).send({ success: true, guide: guide });
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

module.exports = guideController;
