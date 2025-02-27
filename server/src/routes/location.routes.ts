import Router from 'express'
import LocationController from '../controllers/location.controller'

const router = Router()
const { createLocation, deleteLocation, getLocationById, getLocations, updateLocation } = LocationController

router.post('/location', createLocation)
router.get('/location', getLocations)
router.get('/location/:id', getLocationById)
router.put('/location/:id', updateLocation)
router.delete('/location/:id', deleteLocation)

export default router
