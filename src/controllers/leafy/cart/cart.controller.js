const db = require("../../../models");
const Cart = db.cart;

const cartController = {};

// Post cart
cartController.post = async (req, res) => {
  const responseData = {
    masg: "Error in posting review",
    success: false,
    result: "Empty",
  };

  try {
    const cart = await Cart.create({
      ...req.body,
    });
    if (cart) {
      return res.status(200).send({
        success: true,
        cart,
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

module.exports = cartController;
