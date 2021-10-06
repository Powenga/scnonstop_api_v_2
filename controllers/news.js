const multer = require('multer');
const { News } = require('../utils/sequelize');
const BadRequestError = require('../errors/bad-request-err');

const upload = multer({ dest: '../scnonstop_test_public_html/uploads' });

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
  upload.single('new-image'),
  (req, res, next) => {
    res.send('Файл сохранен');
  },
];
