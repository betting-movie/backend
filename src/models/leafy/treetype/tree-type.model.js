const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const TreeType = sequelize.define(
    "tree-type",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
      },
      category: {
        type: Sequelize.STRING,
      },
      description: {
        type: Sequelize.STRING,
      },
      price: {
        type: Sequelize.STRING,
      },
      image: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      totalRating: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  return TreeType;
};
