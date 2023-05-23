
const express= require ("express");
const mongoose= require("mongoose");
const cookieParser= require("cookie-parser")
const { MongoClient, ServerApiVersion, Int32} = require('mongodb');
const tripRoutes = require("./routes/Trips.js");
const weatherRoutes = require("./routes/Weather");
const exchangeRoutes = require("./routes/Exchangerate");
const authRoute = require("./routes/Auth");
const foodRoutes = require("./routes/Food");
const userRoutes = require("./routes/Users");
require('dotenv').config();
const cors = require('cors');


// const router= express.Router();

// Set up an Express app
const app = express();
app.use(cors({
    origin: 'http://localhost:3000',
}));
app.use(express.json());

// Connect to MongoDB
const uri = process.env.MONGODB_ATLAS_PATH;
mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.log(err));

mongoose.connection.on('connected', () => {
    console.log('Mongoose connected to MongoDB Atlas');
});

//Middlewares here
app.use(cookieParser())

app.use("/api/user", userRoutes);
app.use("/api/auth", authRoute);
app.use("/api/data", tripRoutes);
app.use("/api/weather", weatherRoutes);
app.use("/api/exchange", exchangeRoutes);
// app.use("/api/Food", foodRoutes);



// Start the server
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


