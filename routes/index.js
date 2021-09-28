const router = require('express').Router();

const { mailRouter } = require('./mail');
const { newsRouter } = require('./news');

const NotFoundError = require('../errors/not-found-err');

router.post('/mail', mailRouter);

router.use('/news', newsRouter);

router.use('/specialists', () => {});

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

module.exports = router;
