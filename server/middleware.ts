import { Request, Response, NextFunction } from 'express'
import jwt from 'jsonwebtoken'

const SECRET_KEY = process.env.JWT_SECRET || 'your_secret_key' // Используй переменные окружения

export const authMiddleware = (req: Request, res: Response, next: NextFunction): void => {
  const authHeader = req.headers.authorization

  if (!authHeader || !authHeader.startsWith('Bearer ')) {
    res.status(401).json({ message: 'Нет токена, авторизация отклонена' })
    return // Добавлен return, чтобы избежать проблем с типами
  }

  const token = authHeader.split(' ')[1]

  try {
    const decoded = jwt.verify(token, SECRET_KEY)
    ;(req as any).user = decoded // Можно расширить тип Request
    next() // Вызываем next() в успешном случае
  } catch (error) {
    res.status(403).json({ message: 'Неверный токен' })
  }
}
