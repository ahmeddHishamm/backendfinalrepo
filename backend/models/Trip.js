const mongoose= require("mongoose");

const tripSchema = new mongoose.Schema({
    country_name: {
        type: String,
        required: true
    },
    airfare_cost: {
        type: Number,
        required: true
    },
    avg_cost_per_night: {
        type: Number,
        required: true
    },
    accommodation_cost: {
        type: Number,
        required: true
    },
    meal_cost: {
        type: Number,
        required: true
    },
    Total: {
        type: Number,
        required: true
    },
    departure_date: {
        type: String,
        required: true
    },
    return_date: {
        type: String,
        required: true
    },
    country_code: {
        type: String,
        required: true
    },
    latitude: {
        type: String,
        required: true
    },
    longitude: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    }
 });
 
 module.exports = mongoose.model("Trip", tripSchema);