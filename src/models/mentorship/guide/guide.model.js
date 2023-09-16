const { DataTypes } = require("sequelize");

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
      consulatation_cost: {
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
    },
    {
      timestamps: true,
    }
  );
  // sequelize.sync({ force: true });
  return Guide;
};
