import Router from 'express'
import PositionController from '../controllers/position.controller'

const router = Router()
const { createPosition, getPositions, getPositionById, updatePosition, deletePosition } = PositionController

router.post('/position', createPosition)
router.get('/position', getPositions)
router.get('/position/:id', getPositionById)
router.put('/position/:id', updatePosition)
router.delete('/position/:id', deletePosition)

export default router
