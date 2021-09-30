const express = require('express');
const cors = require('cors');
const { Sequelize } = require('sequelize');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const {
  PORT, NODE_ENV, ORIGIN,
} = require('./config');

const sequelize = new Sequelize({
  database: 'scnonstop_main',
  username: 'scnonstop_main',
  password: 'JFL_8lHG4bnHVzk5UdWbYI9u1Qu7ud',
  dialect: 'mysql',
  host: 'scnonstop.beget.tech',
});

sequelize.authenticate()
  .then(() => console.log('Connection has been established successfully.'))
  .catch((error) => console.error('Unable to connect to the database:', error));

const app = express();

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
