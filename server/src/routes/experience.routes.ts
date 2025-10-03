import Router from 'express'
import ExperienceController from '../controllers/experience.controller'

const router = Router()
const { createExperience, getExperiences, getExperienceById, updateExperience, deleteExperience } =
  ExperienceController

router.post('/experience', createExperience)
router.get('/experience', getExperiences)
router.get('/experience/:id', getExperienceById)
router.put('/experience/:id', updateExperience)
router.delete('/experience/:id', deleteExperience)

export default router
