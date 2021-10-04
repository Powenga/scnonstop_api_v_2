const { celebrate, Joi } = require('celebrate');

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
