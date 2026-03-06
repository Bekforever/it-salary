import { Router } from 'express'

import * as experienceController from './experience.controller'

const router = Router()

router.post('/experience', experienceController.create)
router.get('/experience', experienceController.getAll)
router.get('/experience/:id', experienceController.getById)
router.put('/experience/:id', experienceController.update)
router.delete('/experience/:id', experienceController.remove)

export default router
