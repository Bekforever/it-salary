const City = require('../models/city.model')
const User = require('../models/user.model')
const bcrypt = require('bcrypt')

class UserController {
  async createUser(req, res) {
    try {
      const { email, password, ...rest } = req.body
      const existingCity = await City.findByPk(rest.city)
      if (!existingCity) {
        return res.status(404).json({ error: 'Город не найден' })
      }
      const existingUser = await User.findOne({ where: { email } })
      if (existingUser) {
        return res
          .status(400)
          .json({ error: 'Пользователь с таким email уже существует' })
      }
      const hashedPassword = await bcrypt.hash(password, 10)
      const newUser = await User.create({
        password: hashedPassword,
        email,
        ...rest,
      })
      res.json(newUser)
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при создании пользователя' })
    }
  }

  async getUsers(req, res) {
    const users = await User.findAll()
    res.json(users)
  }

  async getUserById(req, res) {
    const { id } = req.params
    const user = await User.findByPk(id)
    res.json(user)
  }

  async updateUser(req, res) {
    const { id } = req.params
    const { email, password, role, city, experience, position, salary } =
      req.body
    const user = await User.update(
      { email, password, role, city, experience, position, salary },
      { where: { id } }
    )
    res.json(user)
  }

  async deleteUser(req, res) {
    try {
      const { id } = req.params
      await User.destroy({ where: { id } })
      res.json('Пользователь удален')
    } catch (error) {
      console.error('Ошибка при выполнении запроса:', error)
      res.status(500).json({ error: 'Ошибка при удалении пользователя' })
    }
  }
}

module.exports = UserController
