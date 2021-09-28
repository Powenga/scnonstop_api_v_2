require('dotenv').config();

const {
  PORT = 3000,
  EMAIL_ADDRESS = 'test@domain.zone',
  EMAIL_PASS = 'password',
} = process.env;

module.exports = {
  PORT,
  EMAIL_ADDRESS,
  EMAIL_PASS,
};
