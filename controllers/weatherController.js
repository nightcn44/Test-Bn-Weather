const weatherService = require('../services/weatherService');

exports.getWeatherByCity = async (req, res) => {
  const { city } = req.query;
  if (!city) return res.status(400).json({ error: 'City is required' });

  try {
    const data = await weatherService.fetchByCity(city);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getWeatherByCoords = async (req, res) => {
  const { lat, lon } = req.query;
  if (!lat || !lon) return res.status(400).json({ error: 'Latitude and Longitude are required' });

  try {
    const data = await weatherService.fetchByCoords(lat, lon);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
