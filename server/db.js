const { Sequelize } = require('sequelize')

const sequelize = new Sequelize('new_db', 'postgres', '1302', {
  host: 'localhost',
  dialect: 'postgres',
})

module.exports = sequelize
