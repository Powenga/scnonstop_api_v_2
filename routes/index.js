const router = require('express').Router();

const { mailRouter } = require('./mail');
const { newsRouter } = require('./news');
const { specialistsRouter } = require('./specialists');

const { login, logout } = require('../controllers/user');
const { sendLoginInfo } = require('../controllers/mail');

const NotFoundError = require('../errors/not-found-err');

// Todo validate this
router.post('/signin', login, sendLoginInfo);
router.get('/signout', logout);

router.use('/mail', mailRouter);

router.use('/news', newsRouter);

router.use('/specialists', specialistsRouter);

router.use('/users', () => {});

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

module.exports = router;
