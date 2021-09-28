const express = require('express');
const cors = require('cors');

const { requestLogger, errorLogger } = require('./middlewares/logger');
const router = require('./routes');

const {
  PORT, NODE_ENV, ORIGIN,
} = require('./config');

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
