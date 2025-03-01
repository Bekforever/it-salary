import { Request, RequestHandler, Response } from 'express'
import bcrypt from 'bcrypt'
import db from '../db/schema'
import { User } from '../db/user.model'
import { City } from '../db/city.model'
import { eq, sql } from 'drizzle-orm'
import { Company } from '../db/company.model'
import { Location } from '../db/location.model'
import { Experience } from '../db/experience.model'
import { Position } from '../db/position.model'

class UserController {
  createUser: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { email, password, city, ...rest } = req.body

      // Проверяем существование города
      const existingCity = await db.select().from(City).where(eq(City.id, city))
      if (existingCity.length === 0) {
        return res.status(404).json({ error: 'Город не найден' })
      }

      // Проверяем, существует ли пользователь с таким email
      const existingUser = await db.select().from(User).where(eq(User.email, email))
      if (existingUser.length > 0) {
        return res.status(400).json({ error: 'Пользователь с таким email уже существует' })
      }

      // Хешируем пароль
      const hashedPassword = await bcrypt.hash(password, 10)

      // Создаем пользователя
      const newUser = await db
        .insert(User)
        .values({
          email,
          password: hashedPassword,
          city,
          ...rest,
        })
        .returning()

      res.json(newUser[0])
    } catch (error) {
      console.error('Ошибка при создании пользователя:', error)
      res.status(500).json({ error: 'Ошибка при создании пользователя' })
    }
  }

  getUsers: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const allUsers = await db
        .select({
          id: User.id,
          email: User.email,
          role: User.role,
          salary: User.salary,
          city: {
            name: City.name,
            id: City.id,
          },
          position: {
            name: Position.name,
            id: Position.id,
          },
          experience: {
            name: Experience.name,
            id: Experience.id,
          },
          company: {
            name: Company.name,
            id: Company.id,
          },
          location: {
            name: Location.name,
            id: Location.id,
          },
        })
        .from(User)
        .leftJoin(City, sql`${User.city} = ${City.id}`)
        .leftJoin(Position, sql`${User.position} = ${Position.id}`)
        .leftJoin(Experience, sql`${User.experience} = ${Experience.id}`)
        .leftJoin(Company, sql`${User.company} = ${Company.id}`)
        .leftJoin(Location, sql`${User.location} = ${Location.id}`)
      res.json(allUsers)
    } catch (error) {
      console.error('Ошибка при получении пользователей:', error)
      res.status(500).json({ error: 'Ошибка при получении пользователей' })
    }
  }

  getUserById: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const user = await db.select().from(User).where(eq(User.id, id))

      if (user.length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' })
      }

      res.json(user[0])
    } catch (error) {
      console.error('Ошибка при получении пользователя:', error)
      res.status(500).json({ error: 'Ошибка при получении пользователя' })
    }
  }

  updateUser: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params
      const { password, city, ...rest } = req.body

      const existingUser = await db.select().from(User).where(eq(User.id, id))
      if (existingUser.length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' })
      }

      // Проверяем существование города, если передан
      if (city) {
        const existingCity = await db.select().from(City).where(eq(City.id, city))
        if (existingCity.length === 0) {
          return res.status(404).json({ error: 'Город не найден' })
        }
      }

      // Хешируем пароль, если передан
      let updatedData = { ...rest }
      if (password) {
        updatedData = { ...updatedData, password: await bcrypt.hash(password, 10) }
      }

      const updatedUser = await db.update(User).set(updatedData).where(eq(User.id, id)).returning()

      res.json(updatedUser[0])
    } catch (error) {
      console.error('Ошибка при обновлении пользователя:', error)
      res.status(500).json({ error: 'Ошибка при обновлении пользователя' })
    }
  }

  deleteUser: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    try {
      const { id } = req.params

      const existingUser = await db.select().from(User).where(eq(User.id, id))
      if (existingUser.length === 0) {
        return res.status(404).json({ error: 'Пользователь не найден' })
      }

      await db.delete(User).where(eq(User.id, id))

      res.json({ message: 'Пользователь удален' })
    } catch (error) {
      console.error('Ошибка при удалении пользователя:', error)
      res.status(500).json({ error: 'Ошибка при удалении пользователя' })
    }
  }
}

export default new UserController()
