const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user.models");
const Message = require("./message.model");

const Reaction = sequelize.define(
  "reactions",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    emoji: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    reactedAt: {
      type: DataTypes.DATE,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Reaction.belongsTo(User)
User.hasMany(Reaction)

Reaction.belongsTo(Message)
Message.hasMany(Reaction)

module.exports = Reaction;
