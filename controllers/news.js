const { News } = require('../utils/sequelize');
const { upload } = require('../utils/file-upload');

const BadRequestError = require('../errors/bad-request-err');
const HostNotFoundError = require('../errors/not-found-err');

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
    .then((data) => res.status(201).send({ id: data.id }))
    .catch((error) => {
      console.log(error.name);
      if (error.name === 'SequelizeValidationError') {
        next(new BadRequestError(error.message));
      }
      next(error);
    });
};

module.exports.updateNewsImage = [
  (req, res, next) => {
    News.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        if (data && data.length !== 0) {
          next();
        } else if (data.length === 0) {
          next(new HostNotFoundError('Новость не найдена!'));
        } else {
          next(new Error());
        }
      })
      .catch(next);
  },
  upload.single('news-image'),
  (req, res, next) => {
    console.log(req.params);
    res.send({ filename: req.filename });
  },
];
