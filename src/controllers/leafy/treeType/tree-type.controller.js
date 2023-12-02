const db = require("../../../models");
const treeType = db.treeType;
const { Op } = require("sequelize");

const treeTypeController = {};

// Post tree data
treeTypeController.post = async (req, res) => {
  const responseData = {
    msg: "Error in posting data",
    success: false,
    result: "Empty",
  };
  try {
    const tree = await treeType.create({
      ...req.body,
    });

    if (tree) {
      return res.status(200).send({
        success: true,
        tree,
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

// get all tree list
treeTypeController.getAllTreeList = async (req, res) => {
  const responseData = {
    msg: "Error in getting tree data",
    success: false,
    result: "Empty",
  };

  try {
    const trees = await treeType.findAll();
    if (trees) {
      return res.status(200).send({
        success: true,
        trees,
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

// Get single tree data
treeTypeController.getTreeDataById = async (req, res) => {
  const responseData = {
    msg: "Error in getting tree data",
    success: false,
    result: "Empty",
  };
  try {
    const tree = await treeType.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (tree) {
      return res.status(200).send({ success: true, tree });
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
treeTypeController.update = async (req, res) => {
  const responseData = {
    msg: "Error in updating",
    success: false,
    result: "Empty",
  };
  try {
    let tree = await treeType.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (tree) {
      for (let i = 0; i < Object.keys(req.body).length; i++) {
        tree[Object.keys(req.body)[i]] = Object.values(req.body)[i];
      }
      await tree.save();
      return res.status(200).send({ success: true, tree: tree });
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

module.exports = treeTypeController;
