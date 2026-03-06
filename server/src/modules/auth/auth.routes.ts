import { Router } from 'express'

import * as authController from './auth.controller'

const router = Router()

router.post('/auth/login', authController.login)
router.get('/auth/me', authController.getMe)

export default router
