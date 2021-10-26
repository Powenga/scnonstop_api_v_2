const jwt = require('jsonwebtoken');
const {
  JWT_TOKEN,
  DEV_SECRET_KEY,
  NODE_ENV,
} = require('../config');
const { UNAUTHORIZED_MESSAGE } = require('../constants');
const Unauthorized = require('../errors/unauthorized-err');
const { User } = require('../utils/sequelize');

module.exports = (req, res, next) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(401).send({ message: 'Неоходима авторизация!' });
  }

  let payload;

  try {
    payload = jwt.verify(
      token,
      NODE_ENV === 'production' ? JWT_TOKEN : DEV_SECRET_KEY,
    );
  } catch (err) {
    return res.status(401).send({ message: 'Неоходима авторизация!' });
  }

  return User.findAll({
    where: {
      id: payload.id,
    },
    attributes: ['id', 'mark'],
  })
    .then((users) => {
      if (users && users.length !== 0 && users[0].mark === payload.mark) {
        req.user = payload;
        return next();
      }
      throw new Unauthorized(UNAUTHORIZED_MESSAGE);
    })
    .catch((error) => res.status(401).send({ message: error.message }));
};
