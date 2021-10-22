const { DataTypes } = require('sequelize');

module.exports.news = {
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [1, 0],
    },
  },
};
