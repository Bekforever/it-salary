import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'
import { User } from '../db/user.model'
import { eq } from 'drizzle-orm'
import { Request, RequestHandler, Response } from 'express'
import db from '../db/schema'

class AuthorizationController {
  login: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    const { email, password } = req.body

    try {
      const users = await db.select().from(User).where(eq(User.email, email))
      const user = users[0]
      const jwtSecret = process.env.JWT_SECRET || 'no_secret'

      if (!user) {
        return res.status(401).json({ message: 'Неверные учетные данные' })
      }

      const isPasswordValid = await bcrypt.compare(password, user.password)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Неверные учетные данные' })
      }

      const token = jwt.sign({ email: user.email, id: user.id }, jwtSecret, {
        expiresIn: '24h',
      })

      const { password: _, ...rest } = user
      return res.json({ message: 'Авторизация успешна', data: { token, user: rest } })
    } catch (error) {
      console.error(error)
      return res.status(500).json({ message: 'Ошибка сервера' })
    }
  }

  get_me: RequestHandler = async function (req: Request, res: Response): Promise<any> {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Токен не предоставлен' })
    }

    try {
      const decoded = jwt.verify(token, 'secret') as { id: number; email: string }
      const users = await db.select().from(User).where(eq(User.id, decoded.id.toString()))
      const user = users[0]

      if (!user) {
        return res.status(401).json({ message: 'Пользователь не найден' })
      }

      const { password: _, ...rest } = user
      return res.json({ message: 'Данные пользователя получены', data: rest })
    } catch (error: any) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Токен истёк' })
      }
      return res.status(401).json({ message: 'Недействительный токен' })
    }
  }
}

export default AuthorizationController
