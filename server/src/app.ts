import cors from 'cors'
import express from 'express'

import { authMiddleware } from './common/middleware/auth.middleware'
import authRouter from './modules/auth/auth.routes'
import cityRouter from './modules/city/city.routes'
import companyRouter from './modules/company/company.routes'
import experienceRouter from './modules/experience/experience.routes'
import locationRouter from './modules/location/location.routes'
import positionRouter from './modules/position/position.routes'
import statisticsRouter from './modules/statistics/statistics.routes'
import userRouter from './modules/user/user.routes'

const app = express()

app.use(express.json())
app.use(cors())

app.use('/api', authRouter)

app.use('/api', authMiddleware, cityRouter)
app.use('/api', authMiddleware, companyRouter)
app.use('/api', authMiddleware, experienceRouter)
app.use('/api', authMiddleware, locationRouter)
app.use('/api', authMiddleware, positionRouter)
app.use('/api', authMiddleware, statisticsRouter)
app.use('/api', authMiddleware, userRouter)

export default app
