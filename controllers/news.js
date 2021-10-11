const { News } = require('../utils/sequelize');
const BadRequestError = require('../errors/bad-request-err');
const { upload } = require('../utils/file-upload');

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
        next(new BadRequestError(error.message));
      }
      next(error);
    });
};

module.exports.updateNewsImage = [
  upload.single('news-image'),
  (req, res, next) => {
    res.send({filename: req.filename});
  },
];
