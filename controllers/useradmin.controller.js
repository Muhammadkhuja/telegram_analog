const { errorHandler } = require("../helpers/error_handler");
const Chat = require("../models/chat.models");
const ChatAdmin = require("../models/chatadminmodels");
const User = require("../models/user.models");

const addNewChatAdmin = async (req, res) => {
  try {
    const {
      chatId,
      userId,
      can_edit_messages,
      can_delete_messages,
      can_add_members,
      can_invite,
      can_pin_messages,
      promored_at,
    } = req.body;

    const newAdmin = await ChatAdmin.create({
      chatId,
      userId,
      can_edit_messages,
      can_delete_messages,
      can_add_members,
      can_invite,
      can_pin_messages,
      promored_at,
    });

    res.status(201).send({
      message: "Chat admin muvaffaqiyatli qo'shildi",
      newAdmin,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllChatAdmins = async (req, res) => {
  try {
    const admins = await ChatAdmin.findAll({include: [Chat, User]});
    res.status(200).send({ message: "Barcha chat adminlari", admins });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdChatAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const admin = await ChatAdmin.findByPk(id);

    if (!admin) {
      return res.status(404).send({ message: "Chat admin topilmadi" });
    }

    res.status(200).send({ admin });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateChatAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      chatId,
      userId,
      can_edit_messages,
      can_delete_messages,
      can_add_members,
      can_invite,
      can_pin_messages,
      promored_at,
    } = req.body;

    const updated = await ChatAdmin.update(
      {
        chatId,
        userId,
        can_edit_messages,
        can_delete_messages,
        can_add_members,
        can_invite,
        can_pin_messages,
        promored_at,
      },
      { where: { id }, returning: true }
    );

    if (!updated[1].length) {
      return res.status(404).send({ message: "Chat admin topilmadi" });
    }

    res.status(200).send({
      message: "Chat admin yangilandi",
      updatedAdmin: updated[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteChatAdmin = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ChatAdmin.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Chat admin topilmadi" });
    }

    res.status(200).send({
      message: "Chat admin o'chirildi",
      deleted,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewChatAdmin,
  findAllChatAdmins,
  findByIdChatAdmin,
  updateChatAdmin,
  deleteChatAdmin,
};
