const { DataTypes } = require('sequelize');

module.exports.user = {
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
      len: [8],
    },
  },
  role: {
    type: DataTypes.STRING,
    validate: {
      isIn: [['owner']],
    },
  },
  mark: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      len: [6, 6],
    },
  },
};
