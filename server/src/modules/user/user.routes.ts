import { Router } from 'express'

import * as userController from './user.controller'

const router = Router()

router.post('/users', userController.create)
router.get('/users', userController.getAll)
router.get('/users/:id', userController.getById)
router.put('/users/:id', userController.update)
router.delete('/users/:id', userController.remove)

export default router
