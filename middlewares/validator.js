const { validationResult, body, param } = require('express-validator');
const BadRequestError = require('../errors/bad-request-err');

const validate = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    next(new BadRequestError(errors.array()[0].msg));
  }
};

const validateUserData = [
  body('userName', 'Поле "Имя пользователя" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 25 })
    .trim()
    .escape(),
  body('userPhone', 'Поле "Телефон" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 25 })
    .trim()
    .escape(),
  body('policy', 'Вы должны согласиться с Политикой конфиденциальности')
    .not()
    .isEmpty()
    .isBoolean(),
];

module.exports.validateSendCallback = [
  validateUserData,
  validate,
];

module.exports.validateSendOrder = [
  body('appType', 'Поле "Тип техники" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 25 })
    .trim()
    .escape(),
  body('appMark', 'Поле "Марка техники" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 25 })
    .trim()
    .escape(),
  body('problem', 'Поле "Неисправность" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 250 })
    .trim()
    .escape(),
  body('address', 'Поле "Адресс" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 150 })
    .trim()
    .escape(),
  validateUserData,
  validate,
];

module.exports.validateNews = [
  body('title', 'Поле "Заголовок" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 60 })
    .trim()
    .escape(),
  body('date', 'Поле "Дата" не валидно')
    .not()
    .isEmpty()
    .isDate({ strictMode: true, format: 'YYYY-MM-DD' }),
  body('content', 'Поле "Текс" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 750 })
    .trim()
    .escape(),
  body('link', 'Поле "Cсылка" не должно быть заполнено!')
    .isEmpty(),
  validate,
];

module.exports.validateSpecialist = [
  body('name', 'Поле "Имя" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 60 })
    .trim()
    .escape(),
  body('about', 'Поле "Описание" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 3, max: 250 })
    .trim()
    .escape(),
  body('link', 'Поле "Cсылка" не должно быть заполнено!')
    .isEmpty(),
  validate,
];

module.exports.validateID = [
  param('id', 'Переданный ID не валиден')
    .not()
    .isEmpty()
    .isInt({ min: 1, max: 2147483648 })
    .escape(),
  validate,
];

module.exports.validateLogin = [
  body('email', 'Поле "email" не валидно')
    .not()
    .isEmpty()
    .isEmail()
    .trim()
    .escape(),
  body('password', 'Поле "Пароль" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .trim(),
  validate,
];

module.exports.validateUpdatePassword = [
  body('password', 'Поле "Пароль" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .trim(),
  body('newPassword', 'Поле "Новый пароль" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 8 })
    .trim(),
  validate,
];
