import db from '../db/schema'
import { Company } from '../db/company.model'
import { Request, RequestHandler, Response } from 'express'
import { eq } from 'drizzle-orm'

class CompanyController {
  createCompany: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.body
      if (!name) {
        return res.status(400).json({ error: 'Поле name обязательно' })
      }

      const existingCompany = await db.select().from(Company).where(eq(Company.name, name))
      if (existingCompany.length > 0) {
        return res.status(400).json({ error: 'Компания с таким именем уже существует' })
      }

      const [newCompany] = await db.insert(Company).values({ name }).returning()
      res.json(newCompany)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при создании компании' })
    }
  }

  getCompanies: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const companies = await db.select().from(Company)
      res.json(companies)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении компаний' })
    }
  }

  getCompanyById: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const company = await db.select().from(Company).where(eq(Company.id, id))
      if (!company.length) {
        return res.status(404).json({ error: 'Компания не найдена' })
      }
      res.json(company[0])
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении компании' })
    }
  }

  updateCompany: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const { name } = req.body

      const company = await db.select().from(Company).where(eq(Company.id, id))
      if (!company.length) {
        return res.status(404).json({ error: 'Компания не найдена' })
      }

      const [updatedCompany] = await db.update(Company).set({ name }).where(eq(Company.id, id)).returning()
      res.json(updatedCompany)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при обновлении компании' })
    }
  }

  deleteCompany: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const company = await db.select().from(Company).where(eq(Company.id, id))
      if (!company.length) {
        return res.status(404).json({ error: 'Компания не найдена' })
      }
      await db.delete(Company).where(eq(Company.id, id))
      res.json({ message: 'Компания удалена' })
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при удалении компании' })
    }
  }
}

export default CompanyController
