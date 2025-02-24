import { Router } from 'express'
import AuthorizationController from '../controllers/authorization.controller'

const router = Router()
const authorizationController = new AuthorizationController()

router.post('/login', (req, res, next) => authorizationController.login(req, res, next))
router.get('/get_me', (req, res, next) => authorizationController.get_me(req, res, next))

export default router
