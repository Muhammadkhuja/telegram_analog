const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Chat = require("./chat.models");

const Message = sequelize.define(
  "messages",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    replyToMessages: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    sentAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
    content: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    isEdited: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isDeleted: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
    isPinned: {
      type: DataTypes.BOOLEAN,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Message.belongsTo(Chat);
Chat.hasMany(Message);

module.exports = Message;
