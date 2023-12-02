const db = require("../../../models");
const treeReview = db.treeReview;
const { Op } = require("sequelize");

const treeReviewController = {};

// Post Review
treeReviewController.post = async (req, res) => {
  const responseData = {
    msg: "Error in posting review",
    success: false,
    result: "Empty",
  };
  try {
    const review = await treeReview.create({
      ...req.body,
    });

    if (review) {
      return res.status(200).send({
        success: true,
        review,
        msg: "Data uploaded successfully",
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

// get all review
treeReviewController.getAllReviews = async (req, res) => {
  const responseData = {
    msg: "Error in getting review",
    success: false,
    result: "Empty",
  };

  try {
    const reviews = await treeReview.findAll({
      include: [
        { model: db.user, as: "user", attributes: ["firstName"] },
        { model: db.treeType, as: "treeType", attributes: ["name"] },
      ],
    });
    if (reviews) {
      return res.status(200).send({
        success: true,
        reviews,
      });
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

// Get review by id
treeReviewController.getReviewById = async (req, res) => {
  const responseData = {
    msg: "Error in getting review",
    success: false,
    result: "Empty",
  };
  try {
    const review = await db.treeReview.findOne({
      where: {
        id: req.params.id,
      },
      include: [
        { model: db.user, as: "user", attributes: ["firstName"] },
        { model: db.treeType, as: "treeType", attributes: ["name"] },
      ],
    });

    if (review) {
      return res.status(200).send({ success: true, review });
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

// Update tree data
treeReviewController.update = async (req, res) => {
  const responseData = {
    msg: "Error in updating",
    success: false,
    result: "Empty",
  };
  try {
    let review = await treeReview.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (review) {
      for (let i = 0; i < Object.keys(req.body).length; i++) {
        review[Object.keys(req.body)[i]] = Object.values(req.body)[i];
      }
      await review.save();
      return res.status(200).send({ success: true, review: review });
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

// Delete review by ID
treeReviewController.deleteReviewById = async (req, res) => {
  const responseData = {
    msg: "Error in deleting review",
    success: false,
    result: "Empty",
  };
  try {
    const deletedRows = await treeReview.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (deletedRows > 0) {
      return res
        .status(200)
        .send({ success: true, msg: "Review deleted successfully" });
    } else {
      return res.status(404).send({ success: false, msg: "Review not found" });
    }
  } catch (error) {
    console.log(error);
    responseData.result = error;
    return res.status(400).send(responseData);
  }
};

module.exports = treeReviewController;
