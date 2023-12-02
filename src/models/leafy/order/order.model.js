const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Order = sequelize.define(
    "order",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      status: {
        type: DataTypes.STRING,
        allowNull: false,
        defaultValue: "Pending",
      },
      amount: {
        type: DataTypes.FLOAT,
        allowNull: false,
      },
      paymentMethod: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      isPaid: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      paidAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      isDelivered: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
      deliveredAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );
  return Order;
};
