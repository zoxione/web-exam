const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Task = sequelize.define('Task', {
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  userId: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  completed: {
    type: DataTypes.BOOLEAN,
    allowNull: false,
    defaultValue: false,
  },
});

module.exports = Task;
