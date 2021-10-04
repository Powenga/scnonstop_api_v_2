const BadRequestError = require('../errors/bad-request-err');
const { News } = require('../utils/sequelize');

module.exports.createNews = (req, res, next) => {
  const {
    title,
    date,
    content,
    link,
  } = req.body;

  News.create({
    title,
    date,
    content,
    link,
  })
    .then((data) => res.status(201).send(data))
    .catch((error) => {
      console.log(error.name);
      if (error.name === 'SequelizeValidationError') {
        next(new BadRequestError('Переданные данные не валидны!'));
      }
      next(error);
    });
};
