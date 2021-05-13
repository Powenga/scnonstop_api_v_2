const { requestLogger, errorLogger } = require('./middlewares/logger');
const nodemailer = require('nodemailer');
const { body, validationResult } = require('express-validator');
const cors = require('cors');
const express = require('express');
const { sendMail } = require('./controllers/mail');
const { validateMessage, checkValidation } = require('./middlewares/validator');

const { PORT = 3000 } = process.env;

const app = express();

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

app.use(requestLogger);

app.post('/api/mail', validateMessage, checkValidation, sendMail);

app.use(function (req, res, next) {
  res.status(404).send('Sorry cant find that!');
});

app.use(errorLogger);

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})
