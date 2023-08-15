const { DataTypes } = require("sequelize");

module.exports = (sequelize, Sequelize) => {
  const Student = sequelize.define(
    "student",
    {
      id: {
        type: Sequelize.UUID,
        defaultValue: Sequelize.UUIDV4,
        primaryKey: true,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      profile_pic: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      bio: {
        type: Sequelize.STRING,
        allowNull: true,
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

      phone_number: {
        type: Sequelize.STRING,
        allowNull: false,
        unique: true,
      },
      domains: {
        type: DataTypes.ARRAY(DataTypes.STRING),
      },
      college: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      year_of_graduation: {
        type: Sequelize.STRING,
        allowNull: true,
      },
      address: {
        type: Sequelize.STRING,
        allowNull: true,
      },
    },
    {
      timestamps: true,
    }
  );

  return Student;
};
