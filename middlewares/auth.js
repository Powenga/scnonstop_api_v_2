const jwt = require('jsonwebtoken');
const {
  JWT_TOKEN,
  DEV_SECRET_KEY,
  NODE_ENV,
} = require('../config');
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
    .then((user) => {
      console.log(user);
      if (user && user.length !== 0 && user.mark === payload.mark) {
        req.user = payload;
        return next();
      }
      return Promise.reject();
    })
    .catch(() => res.status(401).send({ message: 'Неоходима авторизация!' }));
};
