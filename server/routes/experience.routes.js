const Router = require('express')
const router = new Router()
const ExperienceController = require('../controllers/experience.controller')

const { createExperience, getExperiences, getExperienceById, updateExperience, deleteExperience } = new ExperienceController()

router.post('/experiences', createExperience)
router.get('/experiences', getExperiences)
router.get('/experiences/:id', getExperienceById)
router.put('/experiences/:id', updateExperience)
router.delete('/experiences/:id', deleteExperience)

module.exports = router
