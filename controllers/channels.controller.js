
const Channels = require("../models/channel.models");
const { errorHandler } = require("../helpers/error_handler");
const Chat = require("../models/chat.models");


const addNewChannel = async (req, res) => {
  try {
    const { chatId, is_verified, subscribers_cout } = req.body;

    const newChannel = await Channels.create({
      chatId,
      is_verified,
      subscribers_cout,
    });

    res.status(201).send({
      message: "Kanal muvaffaqiyatli qo'shildi",
      newChannel,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

// READ ALL
const findAllChannels = async (req, res) => {
  try {
    const channels = await Channels.findAll({ include: Chat});
    res.status(200).send({ message: "Barcha kanallar", channels });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const channel = await Channels.findByPk(id);

    if (!channel) {
      return res.status(404).send({ message: "Kanal topilmadi" });
    }

    res.status(200).send({ channel });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const { chatId, is_verified, subscribers_cout } = req.body;

    const updatedChannel = await Channels.update(
      {
        chatId,
        is_verified,
        subscribers_cout,
      },
      { where: { id }, returning: true }
    );

    if (!updatedChannel[1].length) {
      return res.status(404).send({ message: "Kanal topilmadi" });
    }

    res.status(200).send({
      message: "Kanal yangilandi",
      updatedChannel: updatedChannel[1][0],
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteChannel = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedChannel = await Channels.destroy({ where: { id } });

    if (!deletedChannel) {
      return res.status(404).send({ message: "Kanal topilmadi" });
    }

    res.status(200).send({
      message: "Kanal o'chirildi",
      deletedChannel,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewChannel,
  findAllChannels,
  findByIdChannel,
  updateChannel,
  deleteChannel,
};
