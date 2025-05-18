const weatherService = require("../services/weatherService");

exports.getWeatherByCity = async (req, res) => {
  const { city } = req.query;

  if (!city) return res.status(400).json({ error: "City is required" });

  try {
    const data = await weatherService.fetchByCity(city);
    res.status(200).json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
