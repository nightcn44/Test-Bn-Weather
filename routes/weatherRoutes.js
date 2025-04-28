const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getWeatherByCity, getWeatherByCoords } = require('../controllers/weatherController');

router.get('/weather/city', authMiddleware, getWeatherByCity);
router.get('/weather/coords', authMiddleware, getWeatherByCoords);

module.exports = router;