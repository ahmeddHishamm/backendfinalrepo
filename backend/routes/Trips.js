const express = require("express");
const router = express.Router();
const {createTrip, getTrip, updateTrip, deleteTrip,getTripsInRange} = require("../controllers/trip");
const {verifyAdmin, verifyUser} = require("../utils/verifyToken");

// Routes Only has endpoints

router.get("/",getTrip)

router.put("/update/:country_name",verifyAdmin,updateTrip)

router.delete("delete/:country_name",deleteTrip)

router.post('create/data',createTrip);

router.get('/trips/range',getTripsInRange); //verifyUser




module.exports = router;






