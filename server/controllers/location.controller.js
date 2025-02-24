const Position = require('../models/position.model') // Импортируем модель Position

class PositionController {
  async createPosition(req, res) {
    try {
      const { name } = req.body
      if (!name) {
        return res.status(400).json({ error: 'Поле name обязательно' })
      }

      // Проверка на существование позиции с таким именем
      const existingPosition = await Position.findOne({ where: { name } }) // Изменено на Sequelize
      if (existingPosition) {
        return res
          .status(400)
          .json({ error: 'Позиция с таким именем уже существует' })
      }

      const newPosition = await Position.create({ name }) // Изменено на Sequelize
      res.json(newPosition) // Убедитесь, что используете новый объект
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при создании позиции' })
    }
  }

  async getPositions(req, res) {
    try {
      const positions = await Position.findAll() // Изменено на Sequelize
      res.json(positions)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении позиций' })
    }
  }

  async getPositionById(req, res) {
    try {
      const { id } = req.params
      const position = await Position.findByPk(id) // Изменено на Sequelize
      res.json(position)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении позиции' })
    }
  }

  async updatePosition(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      const position = await Position.findByPk(id) // Изменено на Sequelize
      if (!position) {
        return res.status(404).json({ error: 'Позиция не найдена' })
      }
      position.name = name // Изменено на Sequelize
      await position.save() // Изменено на Sequelize
      res.json(position)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при обновлении позиции' })
    }
  }

  async deletePosition(req, res) {
    try {
      const { id } = req.params
      const position = await Position.findByPk(id) // Изменено на Sequelize
      if (!position) {
        return res.status(404).json({ error: 'Позиция не найдена' })
      }
      await position.destroy() // Изменено на Sequelize
      res.json({ message: 'Позиция удалена' })
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при удалении позиции' })
    }
  }
}

module.exports = PositionController