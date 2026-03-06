import { Router } from 'express'

import * as positionController from './position.controller'

const router = Router()

router.post('/position', positionController.create)
router.get('/position', positionController.getAll)
router.get('/position/:id', positionController.getById)
router.put('/position/:id', positionController.update)
router.delete('/position/:id', positionController.remove)

export default router
