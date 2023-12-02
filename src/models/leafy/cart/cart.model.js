const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Cart = sequelize.define(
    "cart",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      quantity: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1,
      },
    },
    {
      timestamps: true,
    }
  );
  return Cart;
};
