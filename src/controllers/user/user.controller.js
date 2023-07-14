const db = require("../../models");
const User = db.user;
const jwt = require("jsonwebtoken");
const jwtConfig = require("../../config/jwt.config");
const bcrypt = require("bcrypt");

const userController = {};

userController.register = async (req, res) => {
  const { password } = req.body;

  const responseData = {
    msg: "Error in register",
    success: false,
    result: "Empty",
  };
  try {
    const exist = await User.findOne({
      where: { email: req.body.email },
    });
    if (exist) {
      return res
        .status(409)
        .send({ success: false, msg: "user already exists" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
      firstName: req.body.firstName,
      lastName: req.body.lastName,
      email: req.body.email,
      password: hashedPassword,
      phone_number: req.body.phone_number,
      city: req.body.city,
      state: req.body.state,
      country: req.body.country,
    });

    if (user) {
      return res
        .status(200)
        .send({ success: true, user, msg: "User registered successfully" });
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

userController.login = async (req, res) => {
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
    const user = await User.findOne({
      where: {
        email: req.body.email,
      },
    });
    if (!bcrypt.compareSync(req.body.password, user.password)) {
      return res
        .status(401)
        .send({ success: false, msg: "Invalid email or password" });
    } else if (bcrypt.compareSync(req.body.password, user.password)) {
      return res.status(200).send({
        success: true,
        user: { ...user.dataValues },
        token: jwt.sign(JSON.stringify(user), jwtConfig.secret),
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

module.exports = userController;
