const { DataTypes } = require("sequelize");
const roles = require("../../../utils/roles");

module.exports = (sequelize, Sequelize) => {
  //id, name,designation, description, linkedinUrl, consulatation_cost, time_stamp

  const Guide = sequelize.define(
    "guide",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      email: {
        type: Sequelize.STRING,
        allowNull: false,
        validate: {
          isEmail: true,
        },
        unique: true,
      },
      password: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_pic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      role: {
        type: Sequelize.STRING,
        defaultValue: roles.MENTOR,
      },
      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      designation: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      description: {
        type: Sequelize.STRING,
        // allowNull: false,
      },
      linkedinUrl: {
        type: Sequelize.STRING,
      },
      consultation_cost: {
        type: Sequelize.INTEGER,
      },
      availability: {
        type: Sequelize.STRING,
      },
      education: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      achivements: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      experience: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      skills: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      current_company: {
        type: Sequelize.STRING,
      },
      rating: {
        type: Sequelize.STRING,
      },
      mentees: {
        type: Sequelize.INTEGER,
      },
    },
    {
      timestamps: true,
    }
  );
  // sequelize.sync({ force: true });
  return Guide;
};
