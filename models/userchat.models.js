const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Chat = require("./chat.models");
const User = require("./user.models");

const UserChats = sequelize.define(
  "user_chats",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    joined_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    notifications_enabled: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    last_read_message_time: {
      type: DataTypes.DATE,
      allowNull: false,
    },
    role: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

UserChats.belongsTo(Chat);
Chat.hasMany(UserChats);

UserChats.belongsTo(User);
User.hasMany(UserChats);

module.exports = UserChats;
