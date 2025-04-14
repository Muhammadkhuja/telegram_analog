const { errorHandler } = require("../helpers/error_handler");
const User = require("../models/user.models");
const jwtService = require("../services/jwt.service");
const config = require("config");

const addNewUser = async (req, res) => {
  try {
    const {
      phone_number,
      username,
      first_name,
      last_name,
      profil_photo,
      bio,
      last_seem,
      created_at
    } = req.body;

    const newUser = await User.create({
      phone_number,
      username,
      first_name,
      last_name,
      profil_photo,
      bio,
      last_seem,
      created_at
    });

    res.status(201).send({
      message: "Foydalanuvchi muvaffaqiyatli qo'shildi",
      newUser,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findAllUsers = async (req, res) => {
  try {
    const users = await User.findAll();
    res.status(200).send({ message: "Barcha foydalanuvchilar", users });
  } catch (error) {
    errorHandler(error, res);
  }
};

const findByIdUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findByPk(id);
    if (!user) {
      return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
    }
    res.status(200).send({ user });
  } catch (error) {
    errorHandler(error, res);
  }
};

const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const {
      phone_number,
      username,
      first_name,
      last_name,
      profil_photo,
      bio,
      last_seem,
      created_at
    } = req.body;

    const updatedUser = await User.update(
      {
        phone_number,
        username,
        first_name,
        last_name,
        profil_photo,
        bio,
        last_seem,
        created_at
      },
      { where: { id }, returning: true }
    );

    if (!updatedUser[1].length) {
      return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
    }

    res.status(200).send({ updatedUser: updatedUser[1][0] });
  } catch (error) {
    errorHandler(error, res);
  }
};

const deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedUser = await User.destroy({ where: { id } });
    if (!deletedUser) {
      return res.status(404).send({ message: "Foydalanuvchi topilmadi" });
    }
    res.status(200).send({ message: "Foydalanuvchi o'chirildi", deletedUser });
  } catch (error) {
    errorHandler(error, res);
  }
};

const loginuser = async (req, res) => {
  try {
    const { phone_number } = req.body;

    const username = await User.findOne({ where: { phone_number } });

    if (!username) {
      return res
        .status(400)
        .send({ message: "Telefon raqam noto'g'ri yoki foydalanuvchi yo'q" });
    }

    const payload = {
      id: username.id,
      phone_number: username.phone_number,
      role: "username",
    };

    const tokens = jwtService.generatorTokens(payload);

    await User.update(
      { refresh_token: tokens.refreshtoken },
      { where: { id: username.id } }
    );

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Tizimga xush kelibsiz",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

const logoutuser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res
        .status(400)
        .send({ message: "Cookie refresh token topilmadi" });
    }

    const username = await User.findOne({ where: { refresh_token: refreshToken } });

    if (!username) {
      return res
        .status(400)
        .send({ message: "Token bo'yicha foydalanuvchi topilmadi" });
    }

    await User.update({ refresh_token: null }, { where: { id: username.id } });

    res.clearCookie("refreshToken");
    res.send({ message: "Chiqish muvaffaqiyatli bo‘ldi" });
  } catch (error) {
    errorHandler(error, res);
  }
};

const refreshTokenuser = async (req, res) => {
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(400).send({ message: "Token mavjud emas" });
    }

    const username = await User.findOne({ where: { refresh_token: refreshToken } });

    if (!username) {
      return res.status(400).send({ message: "Foydalanuvchi topilmadi" });
    }

    const payload = {
      id: username.id,
      phone_number: username.phone_number,
      role: "user",
    };

    const tokens = jwtService.generatorTokens(payload);

    await User.update(
      { refresh_token: tokens.refreshtoken },
      { where: { id: username.id } }
    );

    res.cookie("refreshToken", tokens.refreshtoken, {
      httpOnly: true,
      maxAge: config.get("refresh_cookie_time"),
    });

    res.send({
      message: "Token yangilandi",
      accessToken: tokens.accesstoken,
    });
  } catch (error) {
    errorHandler(error, res);
  }
};

module.exports = {
  addNewUser,
  findAllUsers,
  findByIdUser,
  updateUser,
  deleteUser,
  loginuser,
  logoutuser,
  refreshTokenuser,
};
