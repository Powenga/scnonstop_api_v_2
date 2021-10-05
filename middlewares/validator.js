const { celebrate, Joi } = require('celebrate');
const { validationResult, body } = require('express-validator');
const BadRequestError = require('../errors/bad-request-err');

const checkValidation = (req, res, next) => {
  const errors = validationResult(req);
  if (errors.isEmpty()) {
    next();
  } else {
    console.log(errors.array());
    next(new BadRequestError(`${errors.array().join(' ')}`));
  }
};
module.exports.validateSendCallback = [
  body('userName', 'Поле "Имя пользователя" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 2, max: 25 })
    .escape(),
  body('phone', 'Поле "Телефон" не валидно')
    .not()
    .isEmpty()
    .isLength({ min: 1, max: 25 })
    .escape(),
  body('policy', 'Вы должны согласиться с Политикой конфиденциальности')
    .not()
    .isEmpty()
    .toBoolean(),
  checkValidation,
];

module.exports.sendOrderValidator = celebrate({
  body: Joi.object()
    .keys({
      appType: Joi.string().required().min(1).max(25)
        .trim()
        .messages({
          'any.required': 'Поле "Тип техники" должно быть заполнено',
          'string.empty': 'Поле "Тип техники" не может быть пустым',
          'string.min': 'Поле "Тип техники" должно быть больше 1 символа"',
          'string.max': 'Поле "Тип техники" должно быть меньше 25 символов"',
        }),
      appMark: Joi.string().required().min(2).max(25)
        .trim()
        .messages({
          'any.required': 'Поле "Марка техники" должно быть заполнено',
          'string.empty': 'Поле "Марка техники" не может быть пустым',
          'string.min': 'Поле "Марка техники" должно быть больше 2 символов"',
          'string.max': 'Поле "Марка техники" должно быть меньше 25 символов"',
        }),
      problem: Joi.string().required().min(3).max(250)
        .trim()
        .messages({
          'any.required': 'Поле "Неисправность" должно быть заполнено',
          'string.empty': 'Поле "Неисправность" не может быть пустым',
          'string.min': 'Поле "Неисправность" должно быть больше 3 символов"',
          'string.max': 'Поле "Неисправность" должно быть меньше 250 символов"',
        }),
      street: Joi.string().required().min(3).max(50)
        .trim()
        .messages({
          'any.required': 'Поле "Улица" должно быть заполнено',
          'string.empty': 'Поле "Улица" не может быть пустым',
          'string.min': 'Поле "Улица" должно быть больше 3 символов"',
          'string.max': 'Поле "Улица" должно быть меньше 50 символов"',
        }),
      house: Joi.string().required().min(1).max(5)
        .trim()
        .messages({
          'any.required': 'Поле "Дом" должно быть заполнено',
          'string.empty': 'Поле "Дом" не может быть пустым',
          'string.min': 'Поле "Дом" должно быть больше 1 символа"',
          'string.max': 'Поле "Дом" должно быть меньше 5 символов"',
        }),
      apartment: Joi.string().required().min(1).max(5)
        .trim()
        .messages({
          'any.required': 'Поле "Квартира" должно быть заполнено',
          'string.empty': 'Поле "Квартира" не может быть пустым',
          'string.min': 'Поле "Квартира" должно быть больше 1 символа"',
          'string.max': 'Поле "Квартира" должно быть меньше 5 символов"',
        }),
      userName: Joi.string().required().min(2).max(50)
        .trim()
        .messages({
          'any.required': 'Поле "Имя" должно быть заполнено',
          'string.empty': 'Поле "Имя" не может быть пустым',
          'string.min': 'Поле "Имя" должно быть больше 2 символов"',
          'string.max': 'Поле "Имя" должно быть меньше 50 символов"',
        }),
      phone: Joi.string().required().min(3).max(20)
        .trim()
        .messages({
          'any.required': 'Поле "Телефон" должно быть заполнено',
          'string.empty': 'Поле "Телефон" не может быть пустым',
          'string.min': 'Поле "Телефон" должно быть больше 3 символов"',
          'string.max': 'Поле "Телефон" должно быть меньше 20 символов"',
        }),
      policy: Joi.boolean().required()
        .custom((policy) => {
          if (policy !== true) throw new Error();
        })
        .messages({
          'any.required': 'Вы должны согласиться с политикой конфиденциальности',
          'boolean.base': 'Вы должны согласиться с политикой конфиденциальности',
          'any.custom': 'Вы должны согласиться с политикой конфиденциальности',
        }),
    }),
});

module.exports.sendCallbackValidator = celebrate({
  body: Joi.object()
    .keys({
      userName: Joi.string().required().min(2).max(50)
        .trim()
        .messages({
          'any.required': 'Поле "Имя" должно быть заполнено',
          'string.empty': 'Поле "Имя" не может быть пустым',
          'string.min': 'Поле "Имя" должно быть больше 2 символов"',
          'string.max': 'Поле "Имя" должно быть меньше 50 символов"',
        }),
      phone: Joi.string().required().min(3).max(20)
        .trim()
        .messages({
          'any.required': 'Поле "Телефон" должно быть заполнено',
          'string.empty': 'Поле "Телефон" не может быть пустым',
          'string.min': 'Поле "Телефон" должно быть больше 3 символов"',
          'string.max': 'Поле "Телефон" должно быть меньше 20 символов"',
        }),
      policy: Joi.boolean().required()
        .custom((policy) => {
          if (policy !== true) throw new Error();
        })
        .messages({
          'any.required': 'Вы должны согласиться с политикой конфиденциальности',
          'boolean.base': 'Вы должны согласиться с политикой конфиденциальности',
          'any.custom': 'Вы должны согласиться с политикой конфиденциальности',
        }),
    }),
});

module.exports.createNewsValidator = celebrate({
  body: Joi.object()
    .keys({
      title: Joi.string().required().min(3).max(60)
        .trim()
        .messages({
          'any.required': 'Поле "Заголовок" должно быть заполнено',
          'string.empty': 'Поле "Заголовок" не может быть пустым',
          'string.min': 'Поле "Заголовок" должно быть больше 3 символов"',
          'string.max': 'Поле "Заголовок" должно быть меньше 60 символов"',
        }),
      date: Joi.date().required()
        .messages({
          'any.required': 'Поле "Дата" должно быть заполнено',
          'date.base': 'Поле "Дата" не валидно',
        }),
      content: Joi.string().required().min(3).max(750)
        .trim()
        .messages({
          'any.required': 'Поле "Текст" должно быть заполнено',
          'string.empty': 'Поле "Текст" не может быть пустым',
          'string.min': 'Поле "Текст" должно быть больше 3 символов"',
          'string.max': 'Поле "Текст" должно быть меньше 750 символов"',
        }),
      link: Joi.string().required().uri()
        .trim()
        .messages({
          'any.required': 'Поле "Ссылка" должно быть заполнено',
          'string.empty': 'Поле "Ссылка" не может быть пустым',
          'string.uri': 'Полe "Ссылка" не валидно',
        }),
    }),
}, { error: { escapeHtml: false } });
