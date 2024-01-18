const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Library = sequelize.define('Library', {
  id: {
    type: DataTypes.SMALLINT,
    primaryKey: true,
    autoIncrement: true,
  },
  ownerId: {
    type: DataTypes.SMALLINT,
    allowNull: false,
  },
  countShelves: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
  capacity: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0,
  },
});

module.exports = Library;
