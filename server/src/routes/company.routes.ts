import { Router } from 'express'
import CompanyController from '../controllers/company.controller'

const router = Router()
const { createCompany, getCompanies, getCompanyById, updateCompany, deleteCompany } = CompanyController

router.post('/company', createCompany)
router.get('/company', getCompanies)
router.get('/company/:id', getCompanyById)
router.put('/company/:id', updateCompany)
router.delete('/company/:id', deleteCompany)

export default router
