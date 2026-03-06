import { Router } from 'express'

import * as locationController from './location.controller'

const router = Router()

router.post('/location', locationController.create)
router.get('/location', locationController.getAll)
router.get('/location/:id', locationController.getById)
router.put('/location/:id', locationController.update)
router.delete('/location/:id', locationController.remove)

export default router
