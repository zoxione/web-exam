const { Sequelize } = require('sequelize');
const dotenv = require('dotenv').config();

const sequelize = new Sequelize(dotenv.parsed.DB_CONNECTION, {
  define: {
    freezeTableName: true,
    timestamps: false,
  },
  logging: false,
});

module.exports = sequelize;
