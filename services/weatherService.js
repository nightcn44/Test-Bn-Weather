const axios = require("axios");
const API_KEY = process.env.WEATHER_API_KEY;

const fetchByCity = async (city) => {
  try {
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`;

    const response = await axios.get(url, { timeout: 5000 });

    return response.data;
  } catch (error) {
    throw new Error(
      error.response?.data?.message || "Error fetching weather by city"
    );
  }
};

module.exports = { fetchByCity };
