import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';

//const locationRoutes = require('./routes/locationRoutes');
//const { connectToDatabase } = require('./database');

//This is unsecure, for now replace database username and password
const CONNECTION_URL = 'mongodb+srv://username:password@testcluserno1.z3xc36s.mongodb.net/?retryWrites=true&w=majority'
const app = express();


app.use(cors());
//app.use('/api', locationRoutes);

// Define a basic route
app.get('/', (req, res) => {
  res.send('Server Running');
});



// Start the server
const PORT = process.env.PORT || 3000;

// Connect to the MongoDB database
mongoose.connect(CONNECTION_URL, {useNewUrlParser:true, useUnifiedTopology:true})
  .then(() => app.listen(PORT, ()=> console.log(`Server running on port: ${PORT}`)))
  .catch((error) => console.log(error.message));

//mongoose.set('useFindAndModify', false);
