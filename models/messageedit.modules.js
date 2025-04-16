const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Message = require("./message.model");

const MessageEdit = sequelize.define(
  "message_edits",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    priviousContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    newContent: {
      type: DataTypes.TEXT,
      allowNull: false
    },
    editedAt: {
      type: DataTypes.DATE,
      allowNull: false
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

MessageEdit.belongsTo(Message)
Message.hasMany(MessageEdit)

module.exports = MessageEdit;
