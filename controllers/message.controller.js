const { errorHandler } = require("../helpers/error_handler");
const Message = require("../models/message.model");


const createMessage = async (req, res) => {
  try {
    const {
      chatId,
      replyToMessages,
      sentAt,
      content,
      isEdited,
      isDeleted,
      isPinned,
    } = req.body;

    const newMessage = await Message.create({
      chatId,
      replyToMessages,
      sentAt,
      content,
      isEdited,
      isDeleted,
      isPinned,
    });

    res.status(201).send({
      message: "Xabar yaratildi",
      newMessage,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllMessages = async (req, res) => {
  try {
    const messages = await Message.findAll();
    res.status(200).send({ message: "Barcha xabarlar", messages });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findMessageById = async (req, res) => {
  try {
    const { id } = req.params;
    const message = await Message.findByPk(id);
    if (!message) {
      return res.status(404).send({ message: "Xabar topilmadi" });
    }
    res.status(200).send({ message });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      chatId,
      replyToMessages,
      sentAt,
      content,
      isEdited,
      isDeleted,
      isPinned,
    } = req.body;

    const updated = await Message.update(
      {
        chatId,
        replyToMessages,
        sentAt,
        content,
        isEdited,
        isDeleted,
        isPinned,
      },
      { where: { id }, returning: true }
    );

    if (!updated[1].length) {
      return res.status(404).send({ message: "Xabar topilmadi" });
    }

    res.status(200).send({
      message: "Xabar yangilandi",
      updatedMessage: updated[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteMessage = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Message.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Xabar topilmadi" });
    }

    res.status(200).send({ message: "Xabar o'chirildi", deleted });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createMessage,
  findAllMessages,
  findMessageById,
  updateMessage,
  deleteMessage,
};
