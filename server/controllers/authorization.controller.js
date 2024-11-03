// controllers/authController.js
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const { Sequelize } = require('sequelize')
const User = require('../models/user.model')

class AuthorizationController {
  async login(req, res) {
    const { email, password } = req.body

    try {
      // Ищем пользователя по email
      const user = await User.findOne({ where: { email } })
      if (!user) {
        return res.status(401).json({ message: 'Неверные учетные данные' })
      }
      const hashedPassword = user.password
      // res.json(user)
      // Проверяем пароль
      const isPasswordValid = await bcrypt.compare(password, hashedPassword)
      if (!isPasswordValid) {
        return res.status(401).json({ message: 'Неверные учетные данные' })
      }

      // Генерируем токен
      const token = jwt.sign({ email: user.email }, 'secret', {
        expiresIn: '1h',
      })

      const { password: _, ...userData } = user

      res.json({ token, message: 'Авторизация успешна', user: userData })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
}

module.exports = AuthorizationController
