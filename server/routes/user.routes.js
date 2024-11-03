const { DataTypes } = require('sequelize')
const sequelize = require('../db')

const User = sequelize.define('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
})

module.exports = User
const Router = require('express')
const router = new Router()
const UserController = require('../controllers/user.controller')

const {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
} = new UserController()

router.post('/users', createUser)
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

module.exports = router
