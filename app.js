const express = require('express');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const { sendMail } = require('./controllers/mail');
const { validateMessage, checkValidation } = require('./middlewares/validator');
const NotFoundError = require('./errors/not-found-err');

const {
  PORT, NODE_ENV, ORIGIN,
} = require('./config');

const app = express();

app.use(cors({
  origin: NODE_ENV === 'production' ? ORIGIN.split(' ') : 'http://localhost:3000',
}));
app.use(express.json());

app.use(requestLogger);

app.post('/api/mail', validateMessage, checkValidation, sendMail);

app.use((req, res, next) => {
  next(new NotFoundError('Запрашиваемый ресурс не найден!'));
});

app.use(errorLogger);

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  if (res.headerSent) {
    next(err);
  }
  res
    .status(statusCode)
    .send({
      message: statusCode === 500 ? 'Что-то пошло не так!' : message,
    });
});

app.listen(PORT, () => {
  console.log(`App is listening at http://localhost:${PORT}`);
});
