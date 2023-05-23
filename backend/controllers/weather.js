const axios = require('axios');
const Trip = require("../models/Trip.js");

// Define the constants
const API_KEY = "7aa553f2ed1e72d4dba9d0bd6f487e40";
const FORECAST_BASE_URL = 'https://api.openweathermap.org/data/2.5/forecast';

// Define the function to construct the forecast URL
const getForecastUrl = (latitude, longitude) => {
    return `${FORECAST_BASE_URL}?lat=${latitude}&lon=${longitude}&appid=${API_KEY}`;
};

exports.getWeatherDataForCountry = async (req, res) => {
    try {
        const { country_name } = req.params;

        // Retrieve the longitude and latitude of the specified country from MongoDB
        const countryData = await Trip.findOne({ country_name }, { longitude: 1, latitude: 1 });

        if (!countryData) {
            return res.status(404).json({ message: 'Country not found' });
        }

        // Construct the forecast URL for the specified country using the retrieved longitude and latitude
        const forecastUrl = getForecastUrl(countryData.latitude, countryData.longitude);

        // Make a GET request to the OpenWeatherMap API using the forecast URL for the specified country
        const response = await axios.get(forecastUrl);

        // Extract relevant information from the response
        const cityName = response.data.city.name;
        const countryCode = response.data.city.country;
        const forecastData = response.data.list;

        // Format the relevant information as an object and send it back to the client
        const formattedData = {
            cityName,
            countryCode,
            forecast: forecastData.map((forecast) => ({
                date: forecast.dt_txt,
                temperatureInCelsius: (forecast.main.temp - 273.15).toFixed(2),
                weatherDescription: forecast.weather[0].description,
            })),
        };

        return res.status(200).json(formattedData);
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: 'Internal server error' });
    }
};
