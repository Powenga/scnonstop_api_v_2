const nodemailer = require('nodemailer');
const { NODE_ENV, EMAIL_ADDRESS, EMAIL_PASS } = require('../config');

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.beget.com',
  auth: {
    user: `${EMAIL_ADDRESS || 'test@example.com'}`,
    pass: `${EMAIL_PASS || 'testpassword'}`,
  },
  secure: true,
});

module.exports.sendMail = (req, res, next) => {
  const {
    appType,
    appMark,
    problem,
    street,
    house,
    apartment,
    userName,
    phone,
    policy,
  } = req.body;
  const text = `Тип техники: ${appType};
      Марка: ${appMark};
      Описание проблемы: ${problem};
      Адрес: ${street}, д.${house}, кв.${apartment};
      Имя заказчика: ${userName};
      Телефон: ${phone};
      Согласие с Политикой конфиденциальности ${policy ? 'Да' : 'Нет'}.`;
  const html = `
      <p>Тип техники: ${appType};</p>
      <p>Марка: ${appMark};</p>
      <p>Описание проблемы: ${problem};</p>
      <p>Адрес: ${street}, д.${house}, кв.${apartment};</p>
      <p>Имя заказчика: ${userName};</p>
      <p>Телефон: ${phone};</p>
      <p>Согласие с Политикой конфиденциальности ${policy ? 'Да' : 'Нет'}.;</p>`;
  const mailData = {
    from: `${EMAIL_ADDRESS || 'test@example.com'}`,
    to: `${EMAIL_ADDRESS || 'test@example.com'}`,
    subject: 'Новый заказ',
    text,
    html,
  };
  transporter.sendMail(mailData, (error, info) => {
    if (error) {
      next(new Error('Не удается отправить сообщение!'));
    }
    res.status(200).send({ message: 'Сообщение отправлено!' });
  });
};
