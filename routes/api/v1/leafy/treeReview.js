const express = require("express");
const treeReviewController = require("../../../../src/controllers/leafy/treeReview/tree-review.controller");

const router = express.Router();

router.post("/", treeReviewController.post);
router.put("/:id", treeReviewController.update);
router.get("/:id", treeReviewController.getReviewById);
router.get("/", treeReviewController.getAllReviews);
router.delete("/:id", treeReviewController.deleteReviewById);

module.exports = router;
