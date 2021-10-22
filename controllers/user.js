const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../utils/sequelize');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const ConflictError = require('../errors/conflict-err');
const Unauthorized = require('../errors/unauthorized-err');

const { getRandomString } = require('../utils/utils');

const {
  NODE_ENV,
  JWT_TOKEN,
  DEV_SECRET_KEY,
  SALT_ROUNDS,
} = require('../config');

const {
  USER_DATA_IS_MISSING_MESSAGE,
  USER_UNAUTHORIZED_MESSAGE,
  USER_ALREADY_EXIST_MESSAGE,
  USER_INVALID_DATA_MESSAGE,
  USER_LOGOUT_MESSAGE,
} = require('../constants');

function signToken(user) {
  return jwt.sign(
    { id: user.id, updateDate: user.updatedAt },
    NODE_ENV === 'production' ? JWT_TOKEN : DEV_SECRET_KEY,
    {
      expiresIn: '7d',
    },
  );
}

const findUser = (id) => {
  User.findAll({
    where: {
      id,
    },
  })
    .then((user) => {
      if (user.length === 0) {
        return new NotFoundError('Пользователь не найден!');
      }
      if (user && user.length !== 0) {
        return { id: user.id, mark: user.mark, role: user.role };
      }
      return new Error();
    })
    .catch((error) => new Error(error.message));
};

module.exports = { findUser };

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError(USER_DATA_IS_MISSING_MESSAGE));
  } else {
    User.findOne({ email })
      .select('+password')
      .orFail(new Unauthorized(USER_UNAUTHORIZED_MESSAGE))
      .then((user) => bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new Unauthorized(USER_UNAUTHORIZED_MESSAGE);
          }
          return user;
        }))
      .then((user) => {
        const token = signToken(user);
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 7,
            httpOnly: true,
            sameSite: true,
          })
          .send({ name: user.name, email: user.email, userId: user._id });
      })
      .catch(next);
  }
};

module.exports.logout = (req, res, next) => {
  try {
    res.cookie('jwt', '',
      {
        maxAge: 0,
        httpOnly: true,
        sameSite: true,
      })
      .send({ message: USER_LOGOUT_MESSAGE });
  } catch (err) {
    next(err);
  }
};
