const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const {
  PORT,
  NODE_ENV,
  ORIGIN,
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = require('./config');

const sequelize = new Sequelize({
  database: `${DB_NAME || 'db_name'}`,
  username: `${DB_USERNAME || 'username'}`,
  password: `${DB_PASSWORD || 'password'}`,
  dialect: 'mysql',
  host: `${DB_HOST || 'db_host'}`,
});

const app = express();

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => { throw new Error(error); });

app.use(cors({
  origin: NODE_ENV === 'production' ? ORIGIN.split(' ') : 'http://localhost:3000',
}));
app.use(express.json());

app.use(requestLogger);

app.use('/api', router);

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
