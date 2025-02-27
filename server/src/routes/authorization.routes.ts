import { Router } from 'express'
import AuthorizationController from '../controllers/authorization.controller'

const router = Router()
const { login, get_me } = AuthorizationController

router.post('/login', login)
router.get('/get_me', get_me)

export default router
