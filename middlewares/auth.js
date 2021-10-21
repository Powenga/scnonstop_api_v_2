const jwt = require('jsonwebtoken');
const {
  JWT_TOKEN,
  DEV_SECRET_KEY,
  NODE_ENV,
} = require('../config');

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

  req.user = payload;

  return next();
};
