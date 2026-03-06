import 'dotenv/config'

import app from './src/app'
import db from './src/db/connection'

const port = process.env.PORT || 5000

const start = async () => {
  try {
    db
    console.log('✅ Подключение к базе данных установлено.')

    app.listen(port, () => {
      console.log(`🚀 Сервер запущен на порту ${port}.`)
    })
  } catch (error) {
    console.error('Ошибка при запуске сервера:', error)
  }
}

start()
