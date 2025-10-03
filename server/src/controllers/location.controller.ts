import { Request, RequestHandler, Response } from 'express'
import db from '../db/schema'
import { eq } from 'drizzle-orm'
import { Location } from '../db/location.model'

class LocationController {
  createLocation: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.body
      if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
        return res.status(400).json({ error: 'Некорректное имя локации' })
      }

      const existingLocation = await db.select().from(Location).where(eq(Location.name, name))
      if (existingLocation.length > 0) {
        return res.status(400).json({ error: 'Локация с таким именем уже существует' })
      }

      const newLocation = await db.insert(Location).values({ name }).returning()
      res.json(newLocation)
    } catch (error) {
      console.error('Ошибка при создании локации:', error)
      res.status(500).json({ error: 'Ошибка при создании локации' })
    }
  }

  getLocations: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const locations = await db.select().from(Location)
      res.json(locations)
    } catch (error) {
      console.error('Ошибка при получении локаций:', error)
      res.status(500).json({ error: 'Ошибка при получении локаций' })
    }
  }

  getLocationById: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const location = await db.select().from(Location).where(eq(Location.id, id))
      if (location.length === 0) {
        return res.status(404).json({ error: 'Локация не найдена' })
      }
      res.json(location[0])
    } catch (error) {
      console.error('Ошибка при получении локации:', error)
      res.status(500).json({ error: 'Ошибка при получении локации' })
    }
  }

  updateLocation: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const { name } = req.body

      if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
        return res.status(400).json({ error: 'Некорректное имя локации' })
      }

      const location = await db.select().from(Location).where(eq(Location.id, id))
      if (location.length === 0) {
        return res.status(404).json({ error: 'Локация не найдена' })
      }

      const updatedLocation = await db.update(Location).set({ name }).where(eq(Location.id, id)).returning()

      res.json(updatedLocation[0])
    } catch (error) {
      console.error('Ошибка при обновлении локации:', error)
      res.status(500).json({ error: 'Ошибка при обновлении локации' })
    }
  }

  deleteLocation: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const location = await db.select().from(Location).where(eq(Location.id, id))
      if (location.length === 0) {
        return res.status(404).json({ error: 'Локация не найдена' })
      }

      await db.delete(Location).where(eq(Location.id, id))
      res.json({ message: 'Локация удалена' })
    } catch (error) {
      console.error('Ошибка при удалении локации:', error)
      res.status(500).json({ error: 'Ошибка при удалении локации' })
    }
  }
}

export default new LocationController()