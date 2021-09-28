require('dotenv').config();

const {
  NODE_ENV = 'development',
  PORT = 3001,
  EMAIL_ADDRESS = 'test@domain.zone',
  EMAIL_PASS = 'password',
  ORIGIN,
} = process.env;

module.exports = {
  NODE_ENV,
  PORT,
  EMAIL_ADDRESS,
  EMAIL_PASS,
  ORIGIN,
};
