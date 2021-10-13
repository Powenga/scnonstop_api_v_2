const { DataTypes } = require('sequelize');

module.exports.news = {
  title: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [3, 60],
    },
  },
  date: {
    type: DataTypes.DATEONLY,
    allowNull: false,
    validate: {
      isDate: true,
    },
  },
  content: {
    type: DataTypes.TEXT,
    allowNull: false,
    validate: {
      len: [3, 750],
    },
  },
  link: {
    type: DataTypes.STRING,
    // validate: {
    //   isUrl: true,
    // },
  },
};
