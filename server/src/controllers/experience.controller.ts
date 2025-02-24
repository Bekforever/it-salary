import db from '../db/schema'
import { Experience } from '../db/experience.model'
import { Request, RequestHandler, Response } from 'express'
import { eq } from 'drizzle-orm'

class ExperienceController {
  createExperience: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.body
      if (!name) {
        return res.status(400).json({ error: 'Поле name обязательно' })
      }
      const [newExperience] = await db.insert(Experience).values({ name }).returning()
      res.json(newExperience)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при создании опыта' })
    }
  }

  getExperiences: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const result = await db.select().from(Experience)
      res.json(result)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении опыта' })
    }
  }

  getExperienceById: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const experience = await db.select().from(Experience).where(eq(Experience.id, id))
      if (!experience.length) {
        return res.status(404).json({ error: 'Опыт не найден' })
      }
      res.json(experience[0])
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при получении опыта' })
    }
  }

  updateExperience: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const { name } = req.body

      const experience = await db.select().from(Experience).where(eq(Experience.id, id))
      if (!experience.length) {
        return res.status(404).json({ error: 'Опыт не найден' })
      }

      const [updatedExperience] = await db
        .update(Experience)
        .set({ name })
        .where(eq(Experience.id, id))
        .returning()
      res.json(updatedExperience)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при обновлении опыта' })
    }
  }

  deleteExperience: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      if (!id) {
        return res.status(400).json({ error: 'Поле id обязательно' })
      }
      const experience = await db.select().from(Experience).where(eq(Experience.id, id))
      if (!experience.length) {
        return res.status(404).json({ error: 'Опыт не найден' })
      }
      await db.delete(Experience).where(eq(Experience.id, id))
      res.json({ message: 'Опыт удален' })
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при удалении опыта' })
    }
  }
}

export default ExperienceController
