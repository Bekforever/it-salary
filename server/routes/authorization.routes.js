const Router = require('express')
const router = new Router()
const AuthorizationController = require('../controllers/authorization.controller')

const { login } = new AuthorizationController()

router.post('/login', login)

module.exports = router
