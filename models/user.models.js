const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const User = sequelize.define(
  "users",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    phone_number: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    first_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    profil_photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    bio: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_seem: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => Date.now(),
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => Date.now(),
    },
    refresh_token: {
      type: DataTypes.STRING
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = User;
