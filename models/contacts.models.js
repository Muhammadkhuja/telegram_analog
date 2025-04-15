const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const User = require("./user.models");

const Contact = sequelize.define(
  "contacts",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    display_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    is_blocked: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    },
    added_on: {
      type: DataTypes.DATE,
      allowNull: true,
      defaultValue: () => Date.now(),
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

Contact.belongsTo(User);
User.hasMany(Contact);

module.exports = Contact;
