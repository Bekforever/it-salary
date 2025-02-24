import Router from 'express'
import PositionController from '../controllers/position.controller'

const router = Router()
const { createPosition, getPositions, getPositionById, updatePosition, deletePosition } =
  new PositionController()

router.post('/positions', createPosition)
router.get('/positions', getPositions)
router.get('/positions/:id', getPositionById)
router.put('/positions/:id', updatePosition)
router.delete('/positions/:id', deletePosition)

export default router
