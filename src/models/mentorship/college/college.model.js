const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const College = sequelize.define(
    "college",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      college_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      city: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      state: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      collegeType: {
        type: DataTypes.ENUM,
        values: ["GOVERNMENT", "DEEMED", "PRIVATE", "AUTONOMOUS"],
        defaultValue: "GOVERNMENT",
      },
      category: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      coursesAvailable: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      ranking: {
        type: Sequelize.STRING,
      },
      fees: {
        type: Sequelize.STRING,
      },
      placement: {
        type: DataTypes.ARRAY(DataTypes.STRING),
        allowNull: true,
      },
      collegeLogo: {
        type: Sequelize.STRING,
      },
      avgCutoff: {
        type: Sequelize.STRING,
      },
      counsellingMode: {
        type: DataTypes.ENUM,
        values: ["ONLINE", "OFFLINE"],
        defaultValue: "ONLINE",
      },
      admissionMode: {
        type: Sequelize.STRING,
      },
      establishmentYear: {
        type: Sequelize.STRING,
      },
      campusSize: {
        type: Sequelize.STRING,
      },

      numberOfStudents: {
        type: Sequelize.STRING,
      },
      numberOfDepartments: {
        type: Sequelize.STRING,
      },
      rankingsNIRF: {
        type: Sequelize.STRING,
      },
      flagshipCourse: {
        type: Sequelize.STRING,
      },
      numberOfCourses: {
        type: Sequelize.STRING,
      },
      totalFaculty: {
        type: Sequelize.STRING,
      },
      scholarshipsOffered: {
        type: Sequelize.STRING,
      },
      brochure: {
        type: Sequelize.STRING,
      },
    },
    {
      timestamps: true,
    }
  );
  // sequelize.sync({ force: true });
  return College;
};
