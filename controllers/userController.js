/* eslint-disable object-curly-newline */
/* eslint-disable no-unused-vars */
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const userModel = require('../models/user');
const NotFoundError = require('../utils/errors/NotFoundError');
const ConfilctError = require('../utils/errors/ConflictError');
const { JWT_SECRET } = require('../utils/constants');

module.exports.getUsers = (req, res, next) => {
  userModel.find({})
    .then((users) => res.send(users))
    .catch(next);
};

module.exports.createUser = (req, res, next) => {
  const { name, about, avatar, email, password } = req.body;
  bcrypt.hash(password, 10)
    .then((hash) => userModel.create({ name, about, avatar, email, password: hash }))
    .then((user) => res.send({
      user: {
        email: user.email,
        name: user.name,
        about: user.about,
        avatar: user.avatar,
        _id: user._id,
      },
    }))
    .catch((err) => {
      if (err.code === 11000) {
        next(new ConfilctError('Пользователь с таким email уже существует!'));
        return;
      }
      next(err);
    });
};

module.exports.updateUser = (req, res, next) => {
  const { name, about } = req.body;
  userModel.findByIdAndUpdate(
    req.user._id,
    { name, about },
    {
      new: true,
      runValidators: true,
    },
  )
    .then((user) => res.send(user))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  userModel.checkUser({ email, password })
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_SECRET,
        { expiresIn: '7d' },
      );
      res
        .cookie('jwt', token, {
          maxAge: 3600000 * 24 * 7,
          httpOnly: true,
        })
        .send({ id: user._id });
    })
    .catch(next);
};

module.exports.getUserInfo = (req, res, next) => {
  userModel.findById(req.user._id)
    .then((user) => {
      if (!user) {
        throw new NotFoundError('Пользователь с таким id не найден');
      }
      res.send(user);
    })
    .catch(next);
};

module.exports.signout = (_, res, next) => {
  res.clearCookie('jwt').send({ message: 'Вы вышли из профиля' })
    .catch((err) => {
      next(err);
    });
};
