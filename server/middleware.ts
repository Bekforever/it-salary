import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'no_secret'

export interface AuthRequest extends Request {
  user?: any // Можно заменить на конкретный тип пользователя
}

export const authMiddleware = (req: AuthRequest, res: Response, next: NextFunction) => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    return res.status(401).json({ message: 'Нет токена, авторизация запрещена' })
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    req.user = decoded // Добавляем данные пользователя в объект запроса
    return next() // ✅ Теперь middleware всегда возвращает void
  } catch (error) {
    return res.status(401).json({ message: 'Неверный токен' })
  }
}
