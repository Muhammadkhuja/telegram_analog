const sequelize = require("../config/db");
const { DataTypes } = require("sequelize");
const Message = require("./message.model");

const MediaFile = sequelize.define(
  "media_files",
  {
    id: {
      type: DataTypes.BIGINT,
      primaryKey: true,
      autoIncrement: true,
    },
    fileType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    filePath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    fileSize: {
      type: DataTypes.BIGINT,
      allowNull: false
    },
    mimeType: {
      type: DataTypes.STRING,
      allowNull: false
    },
    thumbnailPath: {
      type: DataTypes.STRING,
      allowNull: false
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    duration: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
  },
  {
    freezeTableName: true,
    timestamps: false,
  }
);

MediaFile.belongsTo(Message)
Message.hasMany(MediaFile)

module.exports = MediaFile;
