const express = require("express");
const router = express.Router();
const {createTrip, getTrip, updateTrip, deleteTrip,getTripsInRange} = require("../controllers/trip");
const {verifyAdmin} = require("../utils/verifyToken");

// Routes Only has endpoints

router.get("/", getTrip)

router.put("/update/:country_name", verifyAdmin,updateTrip)

router.delete("delete/:country_name",verifyAdmin ,deleteTrip)

router.post('create/data',verifyAdmin,createTrip );  //verifyAdmin

router.get('/trips/range',verifyAdmin,getTripsInRange);




module.exports = router;







