const mongoose = require('mongoose');

const locationSchema = new mongoose.Schema({
  mockID: String,
  latitude: Number,
  longitude: Number,
  //userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }, // Optionally link to a user
});

const Location = mongoose.model('Location', locationSchema);

module.exports = Location;
