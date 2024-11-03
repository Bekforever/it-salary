const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Position = sequelize.define('Position', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = Position
