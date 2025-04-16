const { errorHandler } = require("../helpers/error_handler");
const MediaFile = require("../models/mediafiles.model");


const createMediaFile = async (req, res) => {
  try {
    const {
      messageId,
      fileType,
      filePath,
      fileSize,
      mimeType,
      thumbnailPath,
      width,
      height,
      duration,
    } = req.body;

    const newFile = await MediaFile.create({
      messageId,
      fileType,
      filePath,
      fileSize,
      mimeType,
      thumbnailPath,
      width,
      height,
      duration,
    });

    res.status(201).send({
      message: "Media fayl qo'shildi",
      newFile,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllMediaFiles = async (req, res) => {
  try {
    const files = await MediaFile.findAll();
    res.status(200).send({ message: "Barcha media fayllar", files });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findMediaFileById = async (req, res) => {
  try {
    const { id } = req.params;
    const file = await MediaFile.findByPk(id);
    if (!file) {
      return res.status(404).send({ message: "Media fayl topilmadi" });
    }
    res.status(200).send({ file });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateMediaFile = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      messageId,
      fileType,
      filePath,
      fileSize,
      mimeType,
      thumbnailPath,
      width,
      height,
      duration,
    } = req.body;

    const updated = await MediaFile.update(
      {
        messageId,
        fileType,
        filePath,
        fileSize,
        mimeType,
        thumbnailPath,
        width,
        height,
        duration,
      },
      { where: { id }, returning: true }
    );

    if (!updated[1].length) {
      return res.status(404).send({ message: "Media fayl topilmadi" });
    }

    res.status(200).send({
      message: "Media fayl yangilandi",
      updatedFile: updated[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteMediaFile = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MediaFile.destroy({ where: { id } });
    if (!deleted) {
      return res.status(404).send({ message: "Media fayl topilmadi" });
    }
    res.status(200).send({ message: "Media fayl o'chirildi", deleted });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createMediaFile,
  findAllMediaFiles,
  findMediaFileById,
  updateMediaFile,
  deleteMediaFile,
};
