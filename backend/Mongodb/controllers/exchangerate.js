// Import required modules
const axios = require("axios");
const Trip = require("../models/Trip.js");

// Controller function to convert currency
exports.convertCurrency = async (req, res) => {
    try {
        // Get country name from request parameters
        const { country_name } = req.params;

        // Find trip in database with matching country name
        const trip = await Trip.findOne({ country_name }, {currency: 1});

        // If no matching trip found, return error response
        if (!trip) {
            return res.status(404).json({ message: "Country not found" });
        }

        // Construct API URL with currency conversion details
        const url = `https://api.exchangerate.host/convert?from=${trip.currency}&to=EGP&amount=1`;

        // Make request to API
        const response = await axios.get(url);

        // Return converted amount as response
        return res.json({ converted_amount: response.data.result });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error" });
    }
};