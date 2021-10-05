const process = require('process');
const express = require('express');
const cors = require('cors');
const { errors } = require('celebrate');
const { requestLogger, errorLogger, appErrorLogger } = require('./middlewares/logger');
require('./utils/sequelize');
const router = require('./routes');
const DBConnectionError = require('./errors/db-conntection-err');

const {
  PORT,
  NODE_ENV,
  ORIGIN,
} = require('./config');

// log shutdown errors
process.on('uncaughtExceptionMonitor', (error) => {
  appErrorLogger.error(error);
});

// log rejections and kill app with db connection error
process.on('unhandledRejection', (error) => {
  if (error instanceof DBConnectionError) {
    throw error;
  }
  appErrorLogger.error(error);
});

const app = express();

app.use(cors({
  origin: NODE_ENV === 'production' ? ORIGIN.split(' ') : 'http://localhost:3000',
}));

app.use(express.json());

app.use(requestLogger);

app.use('/api', router);

app.use(errorLogger);
app.use(errors());
app.use((err, req, res, next) => {
  console.log(err);
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
