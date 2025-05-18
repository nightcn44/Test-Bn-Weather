const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getWeatherByCity } = require("../controllers/weatherController");

router.get("/weather/city", authMiddleware, getWeatherByCity);

module.exports = router;
