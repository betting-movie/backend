const db = require("../../../models");
const College = db.College;
const { Op } = require("sequelize");

const collegeController = {};

collegeController.registeredCollege = async (req, res) => {
  const responseData = {
    msg: "Error in register",
    success: false,
    result: "Empty",
  };
  try {
    const college = await College.create({
      ...req.body,
    });
    if (college) {
      return res.status(200).send({ success: true, college: college });
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

module.exports = collegeController;
