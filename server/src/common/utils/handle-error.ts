import { Response } from 'express'

export const handleError = (res: Response, err: any): void => {
  if (err?.status) {
    res.status(err.status).json({ message: err.message })
    return
  }
  console.error(err)
  res.status(500).json({ message: 'Внутренняя ошибка сервера' })
}
