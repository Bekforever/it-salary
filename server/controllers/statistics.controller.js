const { Op, fn, col, cast } = require('sequelize');
const User = require('../models/user.model');
const City = require('../models/city.model');
const Experience = require('../models/experience.model');
const Position = require('../models/position.model');

class StatisticsController {
  async getAllStatistics(req, res) {
    try {
      const { city, experience, position } = req.query;

      let filters = {};
      if (city) filters.city = city;
      if (experience) filters.experience = experience;
      if (position) filters.position = position;

      // Общее количество пользователей
      const totalUsers = await User.count({
        where: filters, // Apply filters here to count only the relevant users
      });

      // Количество пользователей по городам
      const usersByCity = await User.findAll({
        attributes: [
          'city', // Используем внешний ключ city
          [fn('COUNT', col('city')), 'count'], // Группировка по городу
        ],
        include: [
          {
            model: City,
            as: 'cities', // alias из ассоциации
            attributes: ['name', 'id'], // Добавляем id для корректной группировки
          },
        ],
        group: ['city', 'cities.id', 'cities.name'], // Добавляем cities.name в группировку
      });

      // Количество пользователей по опыту
      const usersByExperience = await User.findAll({
        attributes: ['experience', [fn('COUNT', col('experience')), 'count']],
        where: filters,
        group: ['experience', 'experiences.name', 'experiences.id'], // Добавляем experiences.name в группировку
        include: [
          { model: Experience, as: 'experiences', attributes: ['name', 'id'] },
        ],
      });

      // Количество пользователей по позициям
      const usersByPosition = await User.findAll({
        attributes: ['position', [fn('COUNT', col('position')), 'count']],
        where: filters,
        group: ['position', 'positions.id', 'positions.name'], // Добавляем positions.id и positions.name в группировку
        include: [
          {
            model: Position,
            as: 'positions', // Псевдоним, который ты указал в ассоциации
            attributes: ['name', 'id'],
          },
        ],
      });

      // Средняя зарплата по городам
      const avgSalaryByCity = await User.findAll({
        attributes: [
          'city',
          [fn('AVG', cast(col('salary'), 'DECIMAL')), 'averageSalary'],
        ],
        where: filters,
        group: ['city', 'cities.name'], // Добавляем cities.name в группировку
        include: [{ model: City, as: 'cities', attributes: ['name', 'id'] }],
      });

      // Средняя зарплата по опыту
      const avgSalaryByExperience = await User.findAll({
        attributes: [
          'experience',
          [fn('AVG', cast(col('salary'), 'DECIMAL')), 'averageSalary'],
        ],
        where: filters,
        group: ['experience', 'experiences.name', 'position.id'], // Добавляем experiences.name в группировку
        include: [
          { model: Experience, as: 'experiences', attributes: ['name', 'id'] },
        ],
      });

      // Средняя зарплата по позициям
      const avgSalaryByPosition = await User.findAll({
        attributes: [
          'position',
          [fn('AVG', cast(col('salary'), 'DECIMAL')), 'averageSalary'],
        ],
        where: filters,
        group: ['position', 'positions.name', 'position.id'], // Добавляем positions.name в группировку
        include: [
          { model: Position, as: 'positions', attributes: ['name', 'id'] },
        ],
      });

      res.json({
        totalUsers,
        usersByCity,
        usersByExperience,
        usersByPosition,
        avgSalaryByCity,
        avgSalaryByExperience,
        avgSalaryByPosition,
      });
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error);
      res.status(500).json({ error: 'Ошибка при получении статистики' });
    }
  }
}

module.exports = StatisticsController;
