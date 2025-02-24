const Company = require('../models/company.model')

class CompanyController {
  async createCompany(req, res) {
    try {
      const { name } = req.body
      if (!name) {
        return res.status(400).json({ error: 'Поле name обязательно' })
      }

      const existingCompany = await Company.findOne({ where: { name } })
      if (existingCompany) {
        return res.status(400).json({ error: 'Позиция с таким именем уже существует' })
      }

      const newCompany = await Company.create({ name })
      res.json(newCompany)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при создании позиции' })
    }
  }

  async getCompanys(req, res) {
    try {
      const companies = await Company.findAll()
      res.json(companies)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении позиций' })
    }
  }

  async getCompanyById(req, res) {
    try {
      const { id } = req.params
      const company = await Company.findByPk(id)
      res.json(company)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении позиции' })
    }
  }

  async updateCompany(req, res) {
    try {
      const { id } = req.params
      const { name } = req.body
      const company = await Company.findByPk(id)
      if (!company) {
        return res.status(404).json({ error: 'Позиция не найдена' })
      }
      company.name = name
      await company.save()
      res.json(company)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при обновлении позиции' })
    }
  }

  async deleteCompany(req, res) {
    try {
      const { id } = req.params
      const company = await Company.findByPk(id)
      if (!company) {
        return res.status(404).json({ error: 'Позиция не найдена' })
      }
      await company.destroy()
      res.json({ message: 'Позиция удалена' })
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при удалении позиции' })
    }
  }
}

module.exports = CompanyController
