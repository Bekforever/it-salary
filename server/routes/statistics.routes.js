const Router = require('express');
const router = new Router();
const StatisticsController = require('../controllers/statistics.controller');

const { getAllStatistics } = new StatisticsController();

router.get('/statistics', getAllStatistics);

module.exports = router;
