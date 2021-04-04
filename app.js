const express = require('express');
const cors = require('cors');
const nodemailer  = require('nodemailer');
const app = express();
const port = 3000;

const transporter = nodemailer.createTransport({
  port: 465,
  host: "smtp.beget.com",
  auth: {
    user: "dr@ritm.studio",
    pass: "GNaCHAMO_k8gvIMW21HJfa-MmcLB6BHT"
  },
  secure: true
});

app.use(cors());
app.use(express.json());

app.post('/api/mail', (req, res) => {
  const {appType, appMark, problem, street, house, apartment, userName, phone, policy} = req.body;
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
    from: "dr@ritm.studio",
    to: "dr@ritm.studio",
    subject: "Новый заказ",
    text: text,
    html: html
  };
  transporter.sendMail(mailData, (error, info)=>{
    if(error) {
      return console.log(error);
    }
    res.status(200).send({message: "Почта отарвлена!"});
  });
})

app.use(function(req, res, next) {
  res.status(404).send('Sorry cant find that!');
});


app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`)
})
