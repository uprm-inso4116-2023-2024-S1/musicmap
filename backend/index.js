const express = require('express');
const cors = require('cors')
const mapsRoute = require('./routes/mapsRoutes');


const mongoose = require('mongoose')
require('dotenv').config();


const app = express();

/**
 * Add the routes to our `app` instance
 */
app.use(cors());
app.use(express.json());
app.use(express.urlencoded());
app.use('/maps',mapsRoute);
const PORT = 5000;

mongoose.connect("mongodb://localhost:27017/mongooseTest")
app.listen(PORT, () => { console.log(`Listening to on Port ${PORT}`) });


/**
 * Use `POST` to Save Data sent FROM the Front End
 * 
 * Use `PUT` to Update Data sent FROM the Front End
 * 
 * Use `GET` to Send Data TO the Front END
 */