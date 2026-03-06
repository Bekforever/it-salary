import bcrypt from 'bcrypt'
import { eq } from 'drizzle-orm'
import { RequestHandler } from 'express'
import jwt from 'jsonwebtoken'

import db from '../../db/connection'
import { User } from '../user/user.model'

export const login: RequestHandler = async (req, res): Promise<any> => {
  const { email, password } = req.body
  const jwtSecret = process.env.JWT_SECRET || 'no_secret'

  try {
    const users = await db.select().from(User).where(eq(User.email, email))
    const user = users[0]

    if (!user) {
      return res.status(401).json({ message: 'Неверные учетные данные' })
    }

    const isPasswordValid = await bcrypt.compare(password, user.password)
    if (!isPasswordValid) {
      return res.status(401).json({ message: 'Неверные учетные данные' })
    }

    const token = jwt.sign({ email: user.email, id: user.id }, jwtSecret, { expiresIn: '9999h' })
    const { password: _, ...rest } = user
    return res.json({ message: 'Авторизация успешна', data: { token, user: rest } })
  } catch (error) {
    console.error(error)
    return res.status(500).json({ message: 'Ошибка сервера' })
  }
}

export const getMe: RequestHandler = async (req, res): Promise<any> => {
  const token = req.headers.authorization?.split(' ')[1]

  if (!token) {
    return res.status(401).json({ message: 'Токен не предоставлен' })
  }

  try {
    const jwtSecret = process.env.JWT_SECRET || 'no_secret'
    const decoded = jwt.verify(token, jwtSecret) as { id: string; email: string }
    const users = await db.select().from(User).where(eq(User.id, decoded.id))
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
