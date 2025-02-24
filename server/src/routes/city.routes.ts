import { Router } from 'express'
import CityController from '../controllers/city.controller'

const router = Router()
const { createCity, getAllCity, getCityById, updateCity, deleteCity } = new CityController()

router.post('/city', createCity)
router.get('/city', getAllCity)
router.get('/city/:id', getCityById)
router.put('/city/:id', updateCity)
router.delete('/city/:id', deleteCity)

export default router
