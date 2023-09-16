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
        type: Sequelize.FLOAT,
      },
      placement: {
        type: DataTypes.ARRAY(DataTypes.FLOAT),
        allowNull: true,
      },
      collegeLogo: {
        type: Sequelize.STRING,
      },
      avgCutoff: {
        type: Sequelize.FLOAT,
      },
      counsellingMode: {
        type: DataTypes.ENUM,
        values: ['ONLINE', 'OFFLINE'],
        defaultValue: 'ONLINE'
      },
      admissionMode: {
        type: Sequelize.STRING,
      },
      establishmentYear: {
        type: Sequelize.INTEGER,
      },
      campusSize: {
        type: Sequelize.STRING,
      },

      numberOfStudents: {
        type: Sequelize.INTEGER,
      },
      numberOfDepartments: {
        type: Sequelize.INTEGER,
      },
      rankingsNIRF: {
        type: Sequelize.STRING,
      },
      flagshipCourse: {
        type: Sequelize.STRING,
      },
      numberOfCourses: {
        type: Sequelize.INTEGER,
      },
      totalFaculty: {
        type: Sequelize.INTEGER,
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
//   sequelize.sync({ force: true });
  return College;
};
