const Experience = require('../models/experience.model')

class ExperienceController {
  async createExperience(req, res) {
    try {
      const { name } = req.body
      if (!name) {
        return res.status(400).json({ error: 'Поле name обязательно' })
      }
      const result = await Experience.create({ name })
      res.json(result)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при создании опыта' })
    }
  }

  async getExperiences(req, res) {
    try {
      const result = await Experience.findAll()
      res.json(result)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении опыта' })
    }
  }

  async getExperienceById(req, res) {
    try {
      const { id } = req.params
      const result = await Experience.findByPk(id)
      res.json(result.rows[0])
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении опыта' })
    }
  }

  async updateExperience(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      const result = await Experience.findByPk(id)
      if (!result) {
        return res.status(404).json({ error: 'Опыт не найден' })
      }
      result.name = name
      await result.save()
      res.json(result)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при обновлении опыта' })
    }
  }

  async deleteExperience(req, res) {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ error: 'Поле id обязательно' })
      }
      const result = await Experience.findByPk(id)
      if (!result) {
        return res.status(404).json({ error: 'Опыт не найден' })
      }
      await result.destroy()
      res.json({ message: 'Опыт удален' })
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при удалении опыта' })
    }
  }
}

module.exports = ExperienceController
