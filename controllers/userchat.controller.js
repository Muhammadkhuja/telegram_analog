const { errorHandler } = require("../helpers/error_handler");
const UserChat = require("../models/userchat.models");

const addNewUserChat = async (req, res) => {
  try {
    const {
      userId,
      chatId,
      joined_at,
      notifications_enabled,
      last_read_message_time,
      role,
    } = req.body;

    const newUserChat = await UserChat.create({
      userId,
      chatId,
      joined_at,
      notifications_enabled,
      last_read_message_time,
      role,
    });

    res.status(201).send({
      message: "User chat muvaffaqiyatli qo'shildi",
      newUserChat,
    });
  } catch (error) {
    errorHandler(error, res);
      }
};

const findAllUserChats = async (req, res) => {
  try {
    const all = await UserChat.findAll();
    res.status(200).send({ message: "Barcha user chats", all });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findUserChatById = async (req, res) => {
  try {
    const { id } = req.params;
    const found = await UserChat.findByPk(id);
    if (!found) {
      return res.status(404).send({ message: "User chat topilmadi" });
    }
    res.status(200).send({ found });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUserChat = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      userId,
      chatId,
      joined_at,
      notifications_enabled,
      last_read_message_time,
      role,
    } = req.body;

    const updated = await UserChat.update(
      {
        userId,
        chatId,
        joined_at,
        notifications_enabled,
        last_read_message_time,
        role,
      },
      { where: { id }, returning: true }
    );

    if (!updated[1].length) {
      return res.status(404).send({ message: "User chat topilmadi" });
    }

    res.status(200).send({ message: "Yangilandi", updated: updated[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUserChat = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await UserChat.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "User chat topilmadi" });
    }

    res.status(200).send({ message: "O'chirildi", deleted });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewUserChat,
  findAllUserChats,
  findUserChatById,
  updateUserChat,
  deleteUserChat,
};
