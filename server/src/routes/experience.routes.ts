import Router from 'express'
import ExperienceController from '../controllers/experience.controller'

const router = Router()
const { createExperience, getExperiences, getExperienceById, updateExperience, deleteExperience } =
  ExperienceController

router.post('/experiences', createExperience)
router.get('/experiences', getExperiences)
router.get('/experiences/:id', getExperienceById)
router.put('/experiences/:id', updateExperience)
router.delete('/experiences/:id', deleteExperience)

export default router
