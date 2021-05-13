const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
    port: 465,
    host: "smtp.beget.com",
    auth: {
        user: "order@scnonstop.ru",
        pass: "29%kSKL&"
    },
    secure: true
});

module.exports.sendMail = (req, res, next) => {
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
    //TEST
    res.status(200).send({text});
    // transporter.sendMail(mailData, (error, info) => {
    //     if (error) {
    //         return res.status(500).send({ message: 'Что-то сломалось...' })
    //     }
    //     res.status(200).send({ message: "Сообщение отправлено!" });
    // });
}

