const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const Experience = sequelize.define('Experiences', {
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

module.exports = Experience
