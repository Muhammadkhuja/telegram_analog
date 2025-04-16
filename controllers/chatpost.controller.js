const { errorHandler } = require("../helpers/error_handler");
const ChatPost = require("../models/chatpost.model");


const createChatPost = async (req, res) => {
  try {
    const { channelId, messageId, viewsCount } = req.body;

    const newPost = await ChatPost.create({
      channelId,
      messageId,
      viewsCount,
    });

    res.status(201).send({
      message: "Post yaratildi",
      newPost,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllChatPosts = async (req, res) => {
  try {
    const posts = await ChatPost.findAll();
    res.status(200).send({ message: "Barcha postlar", posts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findChatPostById = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await ChatPost.findByPk(id);
    if (!post) {
      return res.status(404).send({ message: "Post topilmadi" });
    }
    res.status(200).send({ post });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateChatPost = async (req, res) => {
  try {
    const { id } = req.params;
    const { channelId, messageId, viewsCount } = req.body;

    const updated = await ChatPost.update(
      { channelId, messageId, viewsCount },
      { where: { id }, returning: true }
    );

    if (!updated[1].length) {
      return res.status(404).send({ message: "Post topilmadi" });
    }

    res.status(200).send({
      message: "Post yangilandi",
      updatedPost: updated[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteChatPost = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await ChatPost.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Post topilmadi", deleted });
    }

    res.status(200).send({ message: "Post o'chirildi" });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createChatPost,
  findAllChatPosts,
  findChatPostById,
  updateChatPost,
  deleteChatPost,
};
