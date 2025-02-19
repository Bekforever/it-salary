const { Op, fn, col, cast } = require('sequelize')
const User = require('../models/user.model')
const City = require('../models/city.model')
const Experience = require('../models/experience.model')
const Position = require('../models/position.model')
const { getAverageSalary, getMaxSalary } = require('../utils/samples')

class StatisticsController {
  async getAllStatistics(req, res) {
    try {
      const { city, experience, position } = req.query

      let filters = {}
      if (city) filters.city = city
      if (experience) filters.experience = experience
      if (position) filters.position = position

      const totalUsers = await User.count({
        where: filters,
      })

      const min = await User.min('salary', {
        where: filters,
      })
      const max = await User.max('salary', {
        where: filters,
      })
      const average = await User.findOne({
        attributes: [[fn('AVG', cast(col('salary'), 'DECIMAL')), 'averageSalary']],
        where: filters,
      })

      res.json({
        data: {
          totalUsers,
          min: +min,
          max: +max,
          average: Math.floor(+average.getDataValue('averageSalary')),
        },
        message: 'Статистика успешно получена',
      })
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ message: 'Ошибка при получении статистики' })
    }
  }
}

module.exports = StatisticsController
