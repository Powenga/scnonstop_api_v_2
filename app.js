const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.beget.com",
  auth: {
    user: "order@scnonstop.ru",
    pass: "29%kSKL&"
  },
  secure: true
});

app.use(cors({ origin: ["https://scnonstop.ru", "https://www.scnonstop.ru"] }));
app.use(express.json());

app.post('/api/mail',
  body('appType').isLength({ max: 25 }).not().isEmpty().trim().escape(),
  body('appMark').isLength({ min: 2, max: 25 }).not().isEmpty().trim().escape(),
  body('problem').isLength({ min: 3, max: 250 }).not().isEmpty().trim().escape(),
  body('street').isLength({ min: 3, max: 50 }).not().isEmpty().trim().escape(),
  body('house').isLength({ min: 1, max: 5 }).not().isEmpty().trim().escape(),
  body('apartment').isLength({ min: 1, max: 5 }).not().isEmpty().trim().escape(),
  body('userName').isLength({ min: 2, max: 50 }).not().isEmpty().trim().escape(),
  body('phone').isLength({ min: 3, max: 20 }).not().isEmpty().trim().escape(),
  body('policy').toBoolean(),
  (req, res) => {
    const validationErrors = validationResult(req);
    if (!validationErrors.isEmpty()) {
      return res.status(400).send({ message: 'Что-то сломалось...' })
    }
    const { appType, appMark, problem, street, house, apartment, userName, phone, policy } = req.body;
    const text = `Тип техники: ${appType};
      Марка: ${appMark};
      Описание проблемы: ${problem};
      Адрес: ${street}, д.${house}, кв.${apartment};
      Имя заказчика: ${userName};
      Телефон: ${phone};
      Согласие с Политикой конфиденциальности ${policy ? "Да" : "Нет"}.`;
    const html = `
      <p>Тип техники: ${appType};</p>
      <p>Марка: ${appMark};</p>
      <p>Описание проблемы: ${problem};</p>
      <p>Адрес: ${street}, д.${house}, кв.${apartment};</p>
      <p>Имя заказчика: ${userName};</p>
      <p>Телефон: ${phone};</p>
      <p>Согласие с Политикой конфиденциальности ${policy ? "Да" : "Нет"}.;</p>`;
    const mailData = {
      from: "order@scnonstop.ru",
      to: "order@scnonstop.ru",
      subject: "Новый заказ",
      text: text,
      html: html
    };
    transporter.sendMail(mailData, (error, info) => {
      if (error) {
        console.log(error);
        return res.status(500).send({ message: 'Что-то сломалось...' })
      }
      res.status(200).send({ message: "Сообщение отправлено!" });
    });
  })

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


app.listen(port, () => {
  console.log(`App is listening at http://localhost:${port}`)
})
