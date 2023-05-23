
const Trip = require("../models/Trip.js")

const createTrip = async (req, res) => {
    try {
        const data = req.body;
        for (const doc of data) {
            const { id, ...tripWithoutID } = doc;
            console.log(tripWithoutID);
            const trip = new Trip({
                ...tripWithoutID
            });
            const savedTrip = await trip.save();
        }
        res.json(data);
    } catch (err) {
        console.log(err);
        res.status(500).send('Internal server error');
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


