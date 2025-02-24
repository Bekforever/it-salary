import { Request, RequestHandler, Response } from 'express'
import { Position } from '../db/position.model'
import { eq } from 'drizzle-orm'
import db from '../db/schema'

class PositionController {
  createPosition: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { name } = req.body
      if (!name || typeof name !== 'string' || name.length < 1 || name.length > 100) {
        return res.status(400).json({ error: 'Некорректное имя позиции' })
      }

      const existingPosition = await db.select().from(Position).where(eq(Position.name, name))
      if (existingPosition.length > 0) {
        return res.status(400).json({ error: 'Позиция с таким именем уже существует' })
      }

      const newPosition = await db.insert(Position).values({ name }).returning()
      res.json(newPosition[0])
    } catch (error) {
      console.error('Ошибка при создании позиции:', error)
      res.status(500).json({ error: 'Ошибка при создании позиции' })
    }
  }

  getPositions: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const positions = await db.select().from(Position)
      res.json(positions)
    } catch (error) {
      console.error('Ошибка при получении позиций:', error)
      res.status(500).json({ error: 'Ошибка при получении позиций' })
    }
  }

  getPositionById: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const position = await db.select().from(Position).where(eq(Position.id, id))
      if (position.length === 0) {
        return res.status(404).json({ error: 'Позиция не найдена' })
      }
      res.json(position[0])
    } catch (error) {
      console.error('Ошибка при получении позиции:', error)
      res.status(500).json({ error: 'Ошибка при получении позиции' })
    }
  }

  updatePosition: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const { name } = req.body
      const existingPosition = await db.select().from(Position).where(eq(Position.id, id))
      if (existingPosition.length === 0) {
        return res.status(404).json({ error: 'Позиция не найдена' })
      }

      const updatedPosition = await db.update(Position).set({ name }).where(eq(Position.id, id)).returning()
      res.json(updatedPosition[0])
    } catch (error) {
      console.error('Ошибка при обновлении позиции:', error)
      res.status(500).json({ error: 'Ошибка при обновлении позиции' })
    }
  }

  deletePosition: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const existingPosition = await db.select().from(Position).where(eq(Position.id, id))
      if (existingPosition.length === 0) {
        return res.status(404).json({ error: 'Позиция не найдена' })
      }

      await db.delete(Position).where(eq(Position.id, id))
      res.json({ message: 'Позиция удалена' })
    } catch (error) {
      console.error('Ошибка при удалении позиции:', error)
      res.status(500).json({ error: 'Ошибка при удалении позиции' })
    }
  }
}

export default PositionController
