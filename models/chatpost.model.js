const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Channels = require("./channel.models");
const Message = require("./message.model");

const ChatPost = sequelize.define(
  "chat_post",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    viewsCount: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

ChatPost.belongsTo(Channels);
Channels.hasMany(ChatPost);

ChatPost.belongsTo(Message);
Message.hasMany(ChatPost);

module.exports = ChatPost;
