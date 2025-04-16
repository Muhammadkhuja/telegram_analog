const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Chat = require("./chat.models");

const Channels = sequelize.define(
  "channels",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    is_verified: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    subscribers_cout: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Channels.belongsTo(Chat);
Chat.hasMany(Channels);

module.exports = Channels;
