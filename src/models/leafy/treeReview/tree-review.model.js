const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const TreeReview = sequelize.define(
    "tree-review",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      rating: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
    },
    {
      timestamps: true,
    }
  );
  return TreeReview;
};
