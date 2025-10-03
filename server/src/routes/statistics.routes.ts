import Router from 'express'
import StatisticsController from '../controllers/statistics.controller'

const router = Router()
const { getAllStatistics } = StatisticsController

router.get('/statistics', getAllStatistics)

export default router
