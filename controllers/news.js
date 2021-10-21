const { News } = require('../utils/sequelize');
const { upload } = require('../utils/file-upload');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const { UPLOAD_FOLDER_PATH, NEWS_IMAGE_FOLDER, NEWS_IMAGE_FIELDNAME } = require('../config');

function checkNews(req, res, next) {
  News.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data && data.length !== 0) {
        [res.locals.news] = data;
        next();
      } else if (data.length === 0) {
        next(new NotFoundError('Новость не найдена!'));
      } else {
        next(new Error());
      }
    })
    .catch(next);
}

function saveNews(news, res, next) {
  news
    .save()
    .then((data) => {
      const {
        id, title, date, content, link,
      } = data;
      res.status(200).send({
        id,
        title,
        date,
        content,
        link,
      });
    })
    .catch(next);
}

module.exports.getAllNews = (req, res, next) => {
  News.findAll()
    .then((news) => {
      if (news && news.length !== 0) {
        const sendNews = news.map(({
          id, title, date, content, link,
        }) => ({
          id, title, date, content, link,
        }));
        res.status(200).send(sendNews);
      } else if (news.length === 0) {
        next(new NotFoundError('Новости не найдены!'));
      } else {
        next(new Error());
      }
    })
    .catch(next);
};

module.exports.createNews = (req, res, next) => {
  const {
    title, date, content,
  } = req.body;

  News.create({
    title,
    date,
    content,
  })
    .then((data) => res.status(201).send({ id: data.id }))
    .catch((error) => {
      if (error.name === 'SequelizeValidationError') {
        next(new BadRequestError(error.message));
      }
      next(error);
    });
};

module.exports.updateNewsImage = [
  checkNews,
  upload.single(NEWS_IMAGE_FIELDNAME),
  (req, res, next) => {
    const { news } = res.locals;
    news.link = `${UPLOAD_FOLDER_PATH}/${NEWS_IMAGE_FOLDER}/${req.file.filename}`;
    saveNews(news, res, next);
  },
];

module.exports.updateNews = [
  checkNews,
  (req, res, next) => {
    const {
      title, date, content,
    } = req.body;
    const { news } = res.locals;
    news.title = title;
    news.date = date;
    news.content = content;
    saveNews(news, res, next);
  },
];

module.exports.deleteNews = [
  checkNews,
  (req, res, next) => {
    const { news } = res.locals;
    news.destroy()
      .then(() => res.send({ message: 'Новость удалена!' }))
      .catch(next);
  },
];
