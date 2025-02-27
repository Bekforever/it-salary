import express from 'express'
import cors from 'cors'
import positionsRouter from './src/routes/position.routes'
import cityRouter from './src/routes/city.routes'
import experiencesRouter from './src/routes/experience.routes'
import usersRouter from './src/routes/user.routes'
import authRouter from './src/routes/authorization.routes'
import statisticsRouter from './src/routes/statistics.routes'
import locationRouter from './src/routes/location.routes'
import companyRouter from './src/routes/company.routes'
import { authMiddleware } from './middleware'
import db from './src/db/schema'

const port = process.env.PORT || 5000
const app = express()

app.use(express.json())
app.use(cors())

const start = async () => {
  try {
    db
    console.log('✅ Подключение к базе данных установлено.')

    app.use('/api', authRouter)

    app.use('/api', authMiddleware, positionsRouter)
    app.use('/api', authMiddleware, cityRouter)
    app.use('/api', authMiddleware, experiencesRouter)
    app.use('/api', authMiddleware, usersRouter)
    app.use('/api', authMiddleware, statisticsRouter)
    app.use('/api', authMiddleware, locationRouter)
    app.use('/api', authMiddleware, companyRouter)

    app.listen(port, () => {
      console.log(`🚀 Сервер запущен на порту ${port}.`)
    })
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error)
  }
}

start()
