const express = require("express");
const treeTypeController = require("../../../../src/controllers/leafy/treeType/tree-type.controller");

const router = express.Router();

router.post("/", treeTypeController.post);
router.put("/:id", treeTypeController.update);
router.get("/:id", treeTypeController.getTreeDataById);
router.get("/", treeTypeController.getAllTreeList);

module.exports = router;
