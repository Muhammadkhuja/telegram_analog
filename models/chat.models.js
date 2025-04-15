const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");

const Chat = sequelize.define(
  "chat",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    photo: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    type: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    members_cout: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => Date.now(),
    },
    invite_link: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

module.exports = Chat;
