const { errorHandler } = require("../helpers/error_handler");
const Chat = require("../models/chat.models");

const addNewChat = async (req, res) => {
  try {
    const {
      title,
      description,
      photo,
      type,
      members_cout,
      created_at,
      invite_link,
    } = req.body;

    const newChat = await Chat.create({
      title,
      description,
      photo,
      type,
      members_cout,
      created_at,
      invite_link,
    });

    res.status(201).send({
      message: "Chat muvaffaqiyatli qo'shildi",
      newChat,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllChats = async (req, res) => {
  try {
    const chats = await Chat.findAll();
    res.status(200).send({ message: "Barcha chatlar", chats });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdChat = async (req, res) => {
  try {
    const { id } = req.params;
    const chat = await Chat.findByPk(id);
    if (!chat) {
      return res.status(404).send({ message: "Chat topilmadi" });
    }
    res.status(200).send({ chat });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateChat = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      title,
      description,
      photo,
      type,
      members_cout,
      created_at,
      invite_link,
    } = req.body;

    const updatedChat = await Chat.update(
      {
        title,
        description,
        photo,
        type,
        members_cout,
        created_at,
        invite_link,
      },
      { where: { id }, returning: true }
    );

    if (!updatedChat[1].length) {
      return res.status(404).send({ message: "Chat topilmadi" });
    }

    res
      .status(200)
      .send({ message: "Chat yangilandi", updatedChat: updatedChat[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteChat = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChat = await Chat.destroy({ where: { id } });
    if (!deletedChat) {
      return res.status(404).send({ message: "Chat topilmadi" });
    }
    res.status(200).send({ message: "Chat o'chirildi", deletedChat });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewChat,
  findAllChats,
  findByIdChat,
  updateChat,
  deleteChat,
};
