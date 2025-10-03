import { Router } from 'express'
import UserController from '../controllers/user.controller'

const router = Router()
const { createUser, deleteUser, getUserById, getUsers, updateUser } = UserController

router.post('/users', createUser)
router.get('/users', getUsers)
router.get('/users/:id', getUserById)
router.put('/users/:id', updateUser)
router.delete('/users/:id', deleteUser)

export default router
