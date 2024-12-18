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
      const token = jwt.sign({ email: user.email, id: user.id }, 'secret', {
        expiresIn: '24h',
      })

      const { dataValues } = user
      const { password: _, ...rest } = dataValues

      res.json({
        message: 'Авторизация успешна',
        data: { token, user: { ...rest } },
      })
    } catch (error) {
      console.error(error)
      res.status(500).json({ message: 'Ошибка сервера' })
    }
  }
  async get_me(req, res) {
    const token = req.headers.authorization?.split(' ')[1]

    if (!token) {
      return res.status(401).json({ message: 'Токен не предоставлен' })
    }

    try {
      const decoded = jwt.verify(token, 'secret')

      const user = await User.findByPk(decoded.id)
      console.log('user', user)
      console.log('decoded', decoded)
      if (!user) {
        return res.status(401).json({ message: 'Пользователь не найден' })
      }

      const { dataValues } = user
      const { password: _, ...rest } = dataValues

      res.json({ message: 'Данные пользователя получены', data: rest })
    } catch (error) {
      if (error.name === 'TokenExpiredError') {
        return res.status(401).json({ message: 'Токен истёк' })
      }

      return res.status(401).json({ message: 'Недействительный токен' })
    }
  }
}

module.exports = AuthorizationController
