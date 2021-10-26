const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const { User } = require('../utils/sequelize');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
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
  USER_LOGOUT_MESSAGE,
  USER_NOT_FOUND_MESSAGE,
  USER_PASSWORD_WAS_UPDATED,
} = require('../constants');

function signToken(user) {
  return jwt.sign(
    { id: user.id, mark: user.mark },
    NODE_ENV === 'production' ? JWT_TOKEN : DEV_SECRET_KEY,
    {
      expiresIn: '14d',
    },
  );
}

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) {
    next(new BadRequestError(USER_DATA_IS_MISSING_MESSAGE));
  } else {
    User.findAll({
      where: {
        email,
      },
    })
      .then((users) => {
        if (users.length === 0 || users.length > 1) {
          throw new Unauthorized(USER_UNAUTHORIZED_MESSAGE);
        }
        const user = users[0];
        return bcrypt.compare(password, user.password)
          .then((matched) => {
            if (!matched) {
              throw new Unauthorized(USER_UNAUTHORIZED_MESSAGE);
            }
            return user;
          });
      })
      .then((user) => {
        const token = signToken(user);
        res
          .cookie('jwt', token, {
            maxAge: 3600000 * 24 * 14,
            httpOnly: true,
            sameSite: true,
          })
          .send({ id: user.id, email: user.email });
        next();
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

module.exports.getUser = (req, res, next) => {
  User.findAll({
    where: {
      id: req.user.id,
    },
  })
    .then((users) => {
      if (users && users.length === 1) {
        const user = users[0];
        res.send({ email: user.email, id: user.id, role: user.role });
        return;
      }
      if (!users || !users.length) {
        throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
      }
      throw new Error();
    })
    .catch(next);
};

module.exports.updateUserPassword = (req, res, next) => {
  const { newPassword } = req.body;
  if (!newPassword) {
    next(new BadRequestError(USER_DATA_IS_MISSING_MESSAGE));
  } else {
    User.findAll({
      where: {
        id: req.user.id,
      },
    })
      .then((users) => {
        if (users && users.length === 1) {
          const user = users[0];
          return bcrypt
            .hash(newPassword, SALT_ROUNDS)
            .then((hash) => {
              user.password = hash;
              user.mark = getRandomString(6);
              return user.save()
                .then(() => {
                  res.send({ message: USER_PASSWORD_WAS_UPDATED });
                })
                .catch((error) => {
                  throw new Error(error.message);
                });
            })
            .catch((error) => {
              throw new Error(error.message);
            });
        }
        if (!users || !users.length) {
          throw new NotFoundError(USER_NOT_FOUND_MESSAGE);
        }
        throw new Error();
      })
      .catch(next);
  }
};
