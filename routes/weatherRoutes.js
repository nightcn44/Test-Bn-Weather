const express = require('express');
const router = express.Router();
const { authMiddleware } = require('../middlewares/authMiddleware');
const { getWeatherByCity, getWeatherByCoords } = require('../controllers/weatherController');

router.get('/city', authMiddleware, getWeatherByCity);
router.get('/coords', authMiddleware, getWeatherByCoords);

module.exports = router;