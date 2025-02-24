const { Op, fn, col, cast } = require('sequelize')
const User = require('../models/user.model')
const City = require('../models/city.model')
const Experience = require('../models/experience.model')
const Position = require('../models/position.model')

class StatisticsController {
  async getAllStatistics(req, res) {
    try {
      const { city, experience, position } = req.query

      let filters = {}
      let message = 'Статистика' // Базовое сообщение

      let cityName = ''
      let experienceName = ''
      let positionName = ''

      if (city) {
        filters.city = city
        const cityData = await City.findByPk(city)
        cityName = cityData ? cityData.name : 'неизвестный город'
        message += ` по городу ${cityName}`
      }
      if (experience) {
        filters.experience = experience
        const experienceData = await Experience.findByPk(experience)
        experienceName = experienceData ? experienceData.name : 'неизвестный опыт'
        message += city ? `, с опытом ${experienceName}` : ` по опыту ${experienceName}`
      }
      if (position) {
        filters.position = position
        const positionData = await Position.findByPk(position)
        positionName = positionData ? positionData.name : 'неизвестная должность'
        message += city || experience ? `, на должности ${positionName}` : ` по должности ${positionName}`
      }

      // users
      const totalUsers = await User.count({ where: filters })
      const usersByCity = await User.findAll({
        attributes: ['city', [fn('COUNT', 'id'), 'usersCount']],
        where: filters,
        group: ['city'],
      })
      // salaries
      const min = await User.min('salary', { where: filters })
      const max = await User.max('salary', { where: filters })
      const average = await User.findOne({
        attributes: [[fn('AVG', cast(col('salary'), 'DECIMAL')), 'averageSalary']],
        where: filters,
      })

      res.json({
        data: {
          users: {
            totalUsers,
            usersByCity,
          },
          salaries: {
            min: +min,
            max: +max,
            average: Math.floor(+average.getDataValue('averageSalary')),
          },
        },
        message,
      })
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ message: 'Ошибка при получении статистики' })
    }
  }
}

module.exports = StatisticsController
