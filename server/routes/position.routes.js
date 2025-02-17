const Router = require('express')
const router = new Router()
const PositionController = require('../controllers/position.controller')

const {
  createPosition,
  getPositions,
  getPositionById,
  updatePosition,
  deletePosition,
} = new PositionController()

router.post('/positions', createPosition)
router.get('/positions', getPositions)
router.get('/positions/:id', getPositionById)
router.put('/positions/:id', updatePosition)
router.delete('/positions/:id', deletePosition)

module.exports = router
