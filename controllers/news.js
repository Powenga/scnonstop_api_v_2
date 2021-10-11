const { News } = require('../utils/sequelize');
const { upload } = require('../utils/file-upload');

const BadRequestError = require('../errors/bad-request-err');
const HostNotFoundError = require('../errors/not-found-err');
const { UPLOAD_FOLDER_PATH, NEWS_IMAGE_FOLDER } = require('../config');

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
    const news = News.findAll({
      where: {
        id: req.params.id,
      },
    })
      .then((data) => {
        if (data && data.length !== 0) {
          res.locals.news = data;
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
    const { news } = res.locals;
    news.link = `${UPLOAD_FOLDER_PATH}/${NEWS_IMAGE_FOLDER}/${req.file.filename}`;
    res.send(news.link);
  },
];
