const { errorHandler } = require("../helpers/error_handler");
const Reaction = require("../models/reaction.model");


const createReaction = async (req, res) => {
  try {
    const { messageId, userId, emoji, reactedAt } = req.body;

    const newReaction = await Reaction.create({
      messageId,
      userId,
      emoji,
      reactedAt,
    });

    res.status(201).send({
      message: "Reaksiya qo'shildi",
      newReaction,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getAllReactions = async (req, res) => {
  try {
    const reactions = await Reaction.findAll();
    res.status(200).send({ message: "Barcha reaksiyalar", reactions });
  } catch (error) {
    errorHandler(error, res);
  }
};

const getReactionById = async (req, res) => {
  try {
    const { id } = req.params;
    const reaction = await Reaction.findByPk(id);
    if (!reaction) {
      return res.status(404).send({ message: "Reaksiya topilmadi" });
    }
    res.status(200).send({ reaction });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const { messageId, userId, emoji, reactedAt } = req.body;

    const updated = await Reaction.update(
      { messageId, userId, emoji, reactedAt },
      { where: { id }, returning: true }
    );

    if (!updated[1].length) {
      return res.status(404).send({ message: "Reaksiya topilmadi" });
    }

    res.status(200).send({
      message: "Reaksiya yangilandi",
      updatedReaction: updated[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteReaction = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Reaction.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Reaksiya topilmadi" });
    }

    res.status(200).send({ message: "Reaksiya o'chirildi", deleted });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createReaction,
  getAllReactions,
  getReactionById,
  updateReaction,
  deleteReaction,
};
