const { errorHandler } = require("../helpers/error_handler");
const Contact = require("../models/contacts.models");
const User = require("../models/user.models");


const addNewContact = async (req, res) => {
  try {
    const { userId, display_name, is_blocked, added_on } = req.body;

    const newContact = await Contact.create({
      userId,
      display_name,
      is_blocked,
      added_on,
    });

    res.status(201).send({
      message: "Kontakt muvaffaqiyatli qo'shildi",
      newContact,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllContacts = async (req, res) => {
  try {
    const contacts = await Contact.findAll({include: User});
    res.status(200).send({ message: "Barcha kontaktlar", contacts });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdContact = async (req, res) => {
  try {
    const { id } = req.params;
    const contact = await Contact.findByPk(id);

    if (!contact) {
      return res.status(404).send({ message: "Kontakt topilmadi" });
    }

    res.status(200).send({ contact });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateContact = async (req, res) => {
  try {
    const { id } = req.params;
    const { userId, display_name, is_blocked, added_on } = req.body;

    const updated = await Contact.update(
      { userId, display_name, is_blocked, added_on },
      { where: { id }, returning: true }
    );

    if (!req.body) {
      return res.status(404).send({ message: "Kontakt topilmadi" });
    }

    res.status(200).send({
      message: "Kontakt yangilandi",
      updatedContact: updated[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteContact = async (req, res) => {
  try {
    const { id } = req.params;
    const deleted = await Contact.destroy({ where: { id } });

    if (!deleted) {
      return res.status(404).send({ message: "Kontakt topilmadi" });
    }

    res.status(200).send({
      message: "Kontakt o'chirildi",
      deleted,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewContact,
  findAllContacts,
  findByIdContact,
  updateContact,
  deleteContact,
};
