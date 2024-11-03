const Router = require('express')
const router = new Router()
const CityController = require('../controllers/city.controller')

const { createCity, getAllCity, getCityById, updateCity, deleteCity } = new CityController()

router.post('/city', createCity)
router.get('/city', getAllCity)
router.get('/city/:id', getCityById)
router.put('/city/:id', updateCity)
router.delete('/city/:id', deleteCity)

module.exports = router
