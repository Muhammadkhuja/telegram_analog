const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Message = require("./message.model");
const User = require("./user.models");

const MessageRead = sequelize.define(
  "message_reads",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    readAt: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => Date.now()
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

MessageRead.belongsTo(Message);
Message.hasMany(MessageRead);

MessageRead.belongsTo(User);
User.hasMany(MessageRead);

module.exports = MessageRead;
