import { Router } from 'express'

import * as cityController from './city.controller'

const router = Router()

router.post('/city', cityController.create)
router.get('/city', cityController.getAll)
router.get('/city/:id', cityController.getById)
router.put('/city/:id', cityController.update)
router.delete('/city/:id', cityController.remove)

export default router
