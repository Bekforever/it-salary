import { Router } from 'express'

import * as companyController from './company.controller'

const router = Router()

router.post('/company', companyController.create)
router.get('/company', companyController.getAll)
router.get('/company/:id', companyController.getById)
router.put('/company/:id', companyController.update)
router.delete('/company/:id', companyController.remove)

export default router
