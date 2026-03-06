import { Router } from 'express'

import * as statisticsController from './statistics.controller'

const router = Router()

router.get('/statistics', statisticsController.getAllStatistics)

export default router
