const { transporter } = require('../utils/mail');
const { EMAIL_ADDRESS } = require('../config');

module.exports.sendOrder = (req, res, next) => {
  const {
    appType,
    appMark,
    problem,
    street,
    house,
    apartment,
    userName,
    userPhone,
    policy,
  } = req.body;
  const text = `Тип техники: ${appType};
      Марка: ${appMark};
      Описание проблемы: ${problem};
      Адрес: ${street}, д.${house}, кв.${apartment};
      Имя заказчика: ${userName};
      Телефон: ${userPhone};
      Согласие с Политикой конфиденциальности ${policy ? 'Да' : 'Нет'}.`;
  const html = `
      <p>Тип техники: ${appType};</p>
      <p>Марка: ${appMark};</p>
      <p>Описание проблемы: ${problem};</p>
      <p>Адрес: ${street}, д.${house}, кв.${apartment};</p>
      <p>Имя заказчика: ${userName};</p>
      <p>Телефон: ${userPhone};</p>
      <p>Согласие с Политикой конфиденциальности ${policy ? 'Да' : 'Нет'}.;</p>`;
  const mailData = {
    from: `${EMAIL_ADDRESS || 'test@example.com'}`,
    to: `${EMAIL_ADDRESS || 'test@example.com'}`,
    subject: 'Новый заказ',
    text,
    html,
  };
  transporter.sendMail(mailData)
    .then(() => res.status(200).send({ message: 'Сообщение отправлено!' }))
    .catch((err) => {
      next(err);
    });
};

module.exports.sendCallback = (req, res, next) => {
  const {
    userName,
    userPhone,
    policy,
  } = req.body;
  const text = `Имя заказчика: ${userName};
    Телефон: ${userPhone};
    Согласие с Политикой конфиденциальности ${policy ? 'Да' : 'Нет'}.`;
  const html = `<p>Имя заказчика: ${userName};</p>
    <p>Телефон: ${userPhone};</p>
    <p>Согласие с Политикой конфиденциальности ${policy ? 'Да' : 'Нет'}.;</p>`;
  const mailData = {
    from: `${EMAIL_ADDRESS || 'test@example.com'}`,
    to: `${EMAIL_ADDRESS || 'test@example.com'}`,
    subject: 'Заявка на обратный звонок',
    text,
    html,
  };
  transporter.sendMail(mailData)
    .then(() => res.status(200).send({ message: 'Сообщение отправлено!' }))
    .catch((err) => {
      next(err);
    });
};

module.exports.sendLoginInfo = (req, res, next) => {
  const text = `На сайте scnonstop.ru выполнен вход ${new Date()};
    Если это были не Вы - смените пароль!`;
  const html = `<p>На сайте scnonstop.ru выполнен вход ${new Date()}</p>
  <p>Если это были не Вы - смените пароль!</p>`;
  const mailData = {
    from: `${EMAIL_ADDRESS || 'test@example.com'}`,
    to: `${EMAIL_ADDRESS || 'test@example.com'}`,
    subject: 'Новая авторизация на сайте',
    text,
    html,
  };
  transporter.sendMail(mailData)
    .then()
    .catch((err) => {
      next(err);
    });
};
