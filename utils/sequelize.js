const { Sequelize } = require('sequelize');
const { news } = require('../models/news');
const { specialist } = require('../models/specialist');
const { user } = require('../models/user');
const DBConnectionError = require('../errors/db-conntection-err');

const {
  DB_NAME,
  DB_USERNAME,
  DB_PASSWORD,
  DB_HOST,
} = require('../config');

const sequelize = new Sequelize({
  database: `${DB_NAME || 'db_name'}`,
  username: `${DB_USERNAME || 'username'}`,
  password: `${DB_PASSWORD || 'password'}`,
  dialect: 'mysql',
  host: `${DB_HOST || 'db_host'}`,
});

const News = sequelize.define('News', news);
const Specialist = sequelize.define('Specialist', specialist);
const User = sequelize.define('User', user);

sequelize.authenticate()
  .then(() => {
    sequelize.sync({ alter: true });
  })
  .catch((error) => {
    throw new DBConnectionError(error.message);
  });

module.exports = { News, Specialist, User };
