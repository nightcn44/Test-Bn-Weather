const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getWeatherByCity, getWeatherByCoords } = require('../controllers/weatherController');

router.get('/city/:name', authMiddleware, getWeatherByCity);
router.get('/coords/:lat/:lon', authMiddleware, getWeatherByCoords);

module.exports = router;