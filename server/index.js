const express = require('express')
const positionsRouter = require('./routes/position.routes')
const cityRouter = require('./routes/city.routes')
const experiencesRouter = require('./routes/experience.routes')
const usersRouter = require('./routes/user.routes')
const authRouter = require('./routes/authorization.routes')
const authMiddleware = require('./middleware')
const cookieParser = require('cookie-parser')
const sequelize = require('./db')
const port = process.env.PORT || 3000
const app = express()
app.use(express.json())
// app.use(express.urlencoded({ extended: true }))
// app.use(cookieParser())

const start = async () => {
  try {
    await sequelize.sync() // Синхронизация моделей
    console.log('База данных синхронизирована!')

    app.use('/api', authRouter)
    app.use('/api', authMiddleware)
    app.use('/api', positionsRouter)
    app.use('/api', cityRouter)
    app.use('/api', experiencesRouter)
    app.use('/api', usersRouter)
  } catch (error) {
    console.error('Ошибка при синхронизации базы данных:', error)
  }
}

start()

app.listen(port, () => {
  console.log(`App running on port ${port}.`)
})
