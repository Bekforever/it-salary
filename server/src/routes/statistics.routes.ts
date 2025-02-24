import Router from 'express'
import StatisticsController from '../controllers/statistics.controller'

const router = Router()
const { getAllStatistics } = new StatisticsController()

router.get('/statistics', getAllStatistics)

export default router
