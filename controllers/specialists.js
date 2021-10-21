const { Specialist } = require('../utils/sequelize');
const { upload } = require('../utils/file-upload');

const BadRequestError = require('../errors/bad-request-err');
const NotFoundError = require('../errors/not-found-err');
const { UPLOAD_FOLDER_PATH, SPECIALIST_IMAGE_FOLDER, SPECIALIST_IMAGE_FIELDNAME } = require('../config');

function checkSpecialist(req, res, next) {
  Specialist.findAll({
    where: {
      id: req.params.id,
    },
  })
    .then((data) => {
      if (data && data.length !== 0) {
        [res.locals.specialist] = data;
        next();
      } else if (data.length === 0) {
        next(new NotFoundError('Специалист не найден!'));
      } else {
        next(new Error());
      }
    })
    .catch(next);
}

function saveSpecialist(specialist, res, next) {
  specialist
    .save()
    .then((data) => {
      const {
        id, name, age, about, link,
      } = data;
      res.status(200).send({
        id,
        name,
        age,
        about,
        link,
      });
    })
    .catch(next);
}

module.exports.getAllSpecialists = (req, res, next) => {
  Specialist.findAll()
    .then((specialists) => {
      if (specialists && specialists.length !== 0) {
        const sendNews = specialists.map(({
          id, name, age, about, link,
        }) => ({
          id, name, age, about, link,
        }));
        res.status(200).send(sendNews);
      } else if (specialists.length === 0) {
        next(new NotFoundError('Специалисты не найдены!'));
      } else {
        next(new Error());
      }
    })
    .catch(next);
};

module.exports.createSpecialist = (req, res, next) => {
  const {
    name, age, about,
  } = req.body;

  Specialist.create({
    name,
    age,
    about,
  })
    .then((data) => res.status(201).send({ id: data.id }))
    .catch((error) => {
      if (error.name === 'SequelizeValidationError') {
        next(new BadRequestError(error.message));
      }
      next(error);
    });
};

module.exports.updateSpecialistImage = [
  checkSpecialist,
  upload.single(SPECIALIST_IMAGE_FIELDNAME),
  (req, res, next) => {
    const { specialist } = res.locals;
    specialist.link = `${UPLOAD_FOLDER_PATH}/${SPECIALIST_IMAGE_FOLDER}/${req.file.filename}`;
    saveSpecialist(specialist, res, next);
  },
];

module.exports.updateSpecialist = [
  checkSpecialist,
  (req, res, next) => {
    const {
      name, age, about,
    } = req.body;
    const { specialist } = res.locals;
    specialist.name = name;
    specialist.age = age;
    specialist.about = about;
    saveSpecialist(specialist, res, next);
  },
];

module.exports.deleteSpecialist = [
  checkSpecialist,
  (req, res, next) => {
    const { specialist } = res.locals;
    specialist.destroy()
      .then(() => res.send({ message: 'Данные о специалисте удалены!' }))
      .catch(next);
  },
];
