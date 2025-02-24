const User = require('../models/user.model')
const { fn, col, cast } = require('sequelize')

const getAverageSalary = async (groupField, model, alias, filters) => {
  return await User.findOne({
    attributes: [[fn('AVG', cast(col('salary'), 'DECIMAL')), 'averageSalary']],
    where: filters,
    raw: true,
  })
}

const getMaxSalary = async (groupField, model, alias, filters) => {
  return await User.findOne({
    attributes: [fn('MAX', col('salary')), 'maxSalary'],
    where: filters,
  })
}

module.exports = { getAverageSalary, getMaxSalary }
