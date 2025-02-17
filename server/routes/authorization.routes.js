const Router = require('express')
const router = new Router()
const AuthorizationController = require('../controllers/authorization.controller')

const { login, get_me } = new AuthorizationController()

router.post('/login', login)
router.get('/get_me', get_me)

module.exports = router
