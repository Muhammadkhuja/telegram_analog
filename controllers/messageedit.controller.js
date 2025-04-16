const { errorHandler } = require("../helpers/error_handler");
const MessageEdit = require("../models/messageedit.modules");


const createMessageEdit = async (req, res) => {
  try {
    const { messageId, priviousContent, newContent, editedAt } = req.body;

    const newEdit = await MessageEdit.create({
      messageId,
      priviousContent,
      newContent,
      editedAt,
    });

    res.status(201).send({
      message: "Tahrir ma'lumoti qo'shildi",
      newEdit,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllMessageEdits = async (req, res) => {
  try {
    const edits = await MessageEdit.findAll();
    res.status(200).send({ message: "Barcha tahrirlar", edits });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findMessageEditById = async (req, res) => {
  try {
    const { id } = req.params;
    const edit = await MessageEdit.findByPk(id);
    if (!edit) {
      return res.status(404).send({ message: "Tahrir topilmadi" });
    }
    res.status(200).send({ edit });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateMessageEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const { messageId, priviousContent, newContent, editedAt } = req.body;

    const updated = await MessageEdit.update(
      { messageId, priviousContent, newContent, editedAt },
      { where: { id }, returning: true }
    );

    if (!updated[1].length) {
      return res.status(404).send({ message: "Tahrir topilmadi" });
    }

    res.status(200).send({
      message: "Tahrir yangilandi",
      updatedEdit: updated[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteMessageEdit = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await MessageEdit.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Tahrir topilmadi" });
    }

    res.status(200).send({ message: "Tahrir o'chirildi", deleted });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  createMessageEdit,
  findAllMessageEdits,
  findMessageEditById,
  updateMessageEdit,
  deleteMessageEdit,
};
