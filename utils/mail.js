const nodemailer = require('nodemailer');
const { EMAIL_ADDRESS, EMAIL_PASS } = require('../config');

const transporter = nodemailer.createTransport({
  port: 465,
  host: 'smtp.beget.com',
  auth: {
    user: `${EMAIL_ADDRESS || 'test@example.com'}`,
    pass: `${EMAIL_PASS || 'testpassword'}`,
  },
  secure: true,
});

module.exports.transporter = transporter;
