const router = require('express').Router();

const { mailRouter } = require('./mail');
const { newsRouter } = require('./news');
const { specialistsRouter } = require('./specialists');
const { userRouter } = require('./users');

const { login, logout } = require('../controllers/user');
const { sendLoginInfo } = require('../controllers/mail');

const { validateLogin } = require('../middlewares/validator');

const NotFoundError = require('../errors/not-found-err');

router.post('/signin', validateLogin, login, sendLoginInfo);
router.get('/signout', logout);

router.use('/mail', mailRouter);

router.use('/news', newsRouter);

router.use('/specialists', specialistsRouter);

router.use('/users', userRouter);

router.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

module.exports = router;
