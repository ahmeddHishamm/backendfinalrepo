
const Trip = require("../models/Trip.js")

const createTrip = async (req, res) => {
    try {
        const trip = new Trip({
            country_name:req.body.country_name,
            airfare_cost:req.body.airfare_cost,
            avg_cost_per_night:req.body.avg_cost_per_night,
            accommodation_cost:req.body.accommodation_cost,
            meal_cost:req.body.meal_cost,
            Total:req.body.Total,
            departure_date:req.body.departure_date,
            return_date:req.body.return_date,
            country_code:req.body.country_code,
            latitude:req.body.latitude,
            longitude:req.body.longitude,
            currency:req.body.currency,
        });

         await trip.save();
       return  res.status(200).send("Trip created successfully");
    } catch (err) {
       return res.status(500).json({ message: err.message });
    }
};


 const getTrip =async (req,res) => {
    try {
        const trips = await Trip.find();
        res.json(trips);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

 const updateTrip = async (req,res) => {
    try {
        const updatedTrip = await Trip.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedTrip) throw new Error("Trip not found");
        res.json(updatedTrip);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}

 const deleteTrip = async (req,res) => {
    try {
        const deletedTrip = await Trip.findOneAndDelete({ country_name: req.params.country_name });
        if (!deletedTrip) throw new Error("Trip not found");
       return  res.json(deletedTrip);
    } catch (err) {
         return res.status(500).json({ message: err.message });
    }
}


const getTripsInRange = async (req,res) => {
    try {
        const { country_name, Total, departure_date, return_date } = req.query;
        let trips;
        if (country_name && departure_date && return_date) {
            trips = await Trip.find({
                country_name,
                departure_date,
                return_date
            });
        } else if (Total && departure_date && return_date) {
            trips = await Trip.find({
                Total: { $lte: Total },
                departure_date,
                return_date
            });
        } else {
            throw new Error('Invalid search criteria');
        }

        return res.json(trips);
    } catch (err) {
        return  res.status(500).json({ message: err.message });
    }
};

module.exports = {
    createTrip,
    getTrip,
    updateTrip,
    deleteTrip,
    getTripsInRange,
};


