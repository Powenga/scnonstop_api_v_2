require('dotenv').config();
const { requestLogger, errorLogger } = require('./middlewares/logger');
const cors = require('cors');
const express = require('express');
const { sendMail } = require('./controllers/mail');
const { validateMessage, checkValidation } = require('./middlewares/validator');
const NotFoundError = require('./errors/not-found-err');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cors({ origin: ["https://scnonstop.ru", "https://www.scnonstop.ru"] }));
app.use(express.json());

app.use(requestLogger);

app.post('/api/mail', validateMessage, checkValidation, sendMail);

app.use(function (req, res, next) {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

app.use(errorLogger);

app.use((err, req, res, next ) => {
  const {statusCode = 500, message } = err;
  if(res.headerSent) {
    next(err);
  }
  res
  .status(statusCode)
  .send({
    message: statusCode === 500 ? 'Что-то пошло не так!' : message
  })
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`)
})
