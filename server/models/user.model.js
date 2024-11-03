const { DataTypes } = require('sequelize')
const sequelize = require('../db')
const City = require('./city.model')
const Experience = require('./experience.model')
const Position = require('./position.model')

const User = sequelize.define('Users', {
  id: {
    type: DataTypes.UUID,
    primaryKey: true,
    defaultValue: DataTypes.UUIDV4,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  city: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: City,
      key: 'id',
    },
  },
  experience: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Experience,
      key: 'id',
    },
  },
  position: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      model: Position,
      key: 'id',
    },
  },
  salary: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
})

// Определяем связи (если они нужны)
// User.belongsTo(City, { foreignKey: 'id' })
// User.belongsTo(Experience, { foreignKey: 'id' })
// User.belongsTo(Position, { foreignKey: 'id' })

module.exports = User
