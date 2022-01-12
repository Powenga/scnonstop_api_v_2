const { DataTypes } = require('sequelize');

module.exports.specialist = {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [2, 60],
    },
  },
  about: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 250],
    },
  },
  link: {
    type: DataTypes.STRING,
    validate: {
      isUrl: true,
    },
  },
};
