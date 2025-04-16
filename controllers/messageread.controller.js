const { errorHandler } = require("../helpers/error_handler");
const MessageRead = require("../models/messageread.models");


const createMessageRead = async (req, res) => {
  try {
    const { messageId, userId, readAt } = req.body;

    const newRead = await MessageRead.create({
      messageId,
      userId,
      readAt,
    });

    res.status(201).send({
      message: "Xabar o'qilganligi qo'shildi",
      newRead,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllMessageReads = async (req, res) => {
  try {
    const reads = await MessageRead.findAll();
    res.status(200).send({ message: "Barcha o'qilgan xabarlar", reads });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findMessageReadById = async (req, res) => {
  try {
    const { id } = req.params;
    const read = await MessageRead.findByPk(id);

    if (!read) {
      return res.status(404).send({ message: "Ma'lumot topilmadi" });
    }

    res.status(200).send({ read });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    const { messageId, userId, readAt } = req.body;

    const updated = await MessageRead.update(
      { messageId, userId, readAt },
      { where: { id }, returning: true }
    );

    if (!updated[1].length) {
      return res.status(404).send({ message: "Yangilash uchun topilmadi" });
    }

    res.status(200).send({
      message: "Ma'lumot yangilandi",
      updatedRead: updated[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteMessageRead = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MessageRead.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Ma'lumot topilmadi" });
    }

    res.status(200).send({ message: "O'chirish muvaffaqiyatli", deleted });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createMessageRead,
  findAllMessageReads,
  findMessageReadById,
  updateMessageRead,
  deleteMessageRead,
};
