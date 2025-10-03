import db from '../db/schema'
import { City } from '../db/city.model'
import { Request, RequestHandler, Response } from 'express'
import { eq } from 'drizzle-orm'

class CityController {
  createCity: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.body
      if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
        return res.status(400).json({ message: 'Некорректное имя города' })
      }
      if (/[^a-zA-Zа-яА-ЯёЁ\s]/.test(name)) {
        return res.status(400).json({ message: 'Имя города содержит недопустимые символы' })
      }

      const existingCity = await db.select().from(City).where(eq(City.name, name))
      if (existingCity.length > 0) {
        return res.status(400).json({ message: 'Такой город уже существует' })
      }

      const [result] = await db.insert(City).values({ name }).returning()
      res.json(result)
    } catch (error) {
      res.status(500).json({ error: 'Ошибка при создании города' })
    }
  }

  getAllCity: RequestHandler = async function (req: Request, res: Response) {
    try {
      const city = await db.select().from(City)
      res.json(city)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ message: 'Ошибка при получении городов' })
    }
  }

  getCityById: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const city = await db.select().from(City).where(eq(City.id, id))
      if (!city.length) {
        return res.status(404).json({ message: 'Город не найден' })
      }
      res.json(city[0])
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при получении города' })
    }
  }

  updateCity: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const { name } = req.body

      const city = await db.select().from(City).where(eq(City.id, id))
      if (!city.length) {
        return res.status(404).json({ message: 'Город не найден' })
      }

      const [updatedCity] = await db.update(City).set({ name }).where(eq(City.id, id)).returning()
      res.json(updatedCity)
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при обновлении города' })
    }
  }

  deleteCity: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const city = await db.select().from(City).where(eq(City.id, id))
      if (!city.length) {
        return res.status(404).json({ message: 'Город не найден' })
      }
      await db.delete(City).where(eq(City.id, id))
      res.json({ message: 'Город удален' })
    } catch (error) {
      res.status(500).json({ message: 'Ошибка при удалении города', error })
    }
  }
}

export default new CityController()
