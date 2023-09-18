const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const StudentGuide = sequelize.define(
    "studentguide",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      student_feedback: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      guide_feedback: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      connect_count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
      },
    },
    {
      timestamps: true,
    }
  );
  return StudentGuide;
};
