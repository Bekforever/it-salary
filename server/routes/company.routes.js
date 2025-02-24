const Router = require('express')
const router = new Router()
const CompanyController = require('../controllers/company.controller')

const {
  createCompany,
  getCompanys,
  getCompanyById,
  updateCompany,
  deleteCompany,
} = new CompanyController()

router.post('/company', createCompany)
router.get('/company', getCompanys)
router.get('/company/:id', getCompanyById)
router.put('/company/:id', updateCompany)
router.delete('/company/:id', deleteCompany)

module.exports = router
