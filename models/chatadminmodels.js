const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user.models");
const Chat = require("./chat.models");

const ChatAdmins = sequelize.define(
  "chat_admins",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    can_edit_messages: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    can_delete_messages: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    can_add_members: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    can_invite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    can_pin_messages: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    promored_at: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

ChatAdmins.belongsTo(Chat);
Chat.hasMany(ChatAdmins);

ChatAdmins.belongsTo(User);
User.hasMany(ChatAdmins);

module.exports = ChatAdmins;
