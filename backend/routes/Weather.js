// Import the required modules
const express = require('express');
const router = express.Router();
const Weather = require('../controllers/weather');

// Define the endpoint for weather data
router.get('/weather/:country_name', Weather.getWeatherDataForCountry);

module.exports = router;