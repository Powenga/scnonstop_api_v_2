const winston = require('winston');
const expressWinston = require('express-winston');

const { createLogger, transports, format } = winston;
const { combine } = format;

const appErrorLogger = createLogger({
  format: combine(
    format.timestamp(),
    format.errors({ stack: true }),
    format.json(),
  ),
  transports: [
    // new transports.Console({ level: 'error' }),
    new transports.File({
      filename: 'error.log',
      level: 'error',
    }),
  ],
});

const requestLogger = expressWinston.logger({
  transports: [
    new winston.transports.File({ filename: 'request.log' }),
  ],
  format: winston.format.json(),
});

const errorLogger = expressWinston.errorLogger({
  transports: [
    new winston.transports.File({ filename: 'requestError.log' }),
  ],
  format: winston.format.json(),
});

module.exports = {
  appErrorLogger,
  requestLogger,
  errorLogger,
};
