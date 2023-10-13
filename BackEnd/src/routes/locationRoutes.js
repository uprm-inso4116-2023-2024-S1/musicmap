const express = require('express');
const router = express.Router();
const Location = require('../models/Location');

// Create a new location
router.post('/locations', async (req, res) => {
  try {
    const location = new Location(req.body);
    await location.save();
    res.status(201).send(location);
  } catch (error) {
    res.status(400).send(error);
  }
});

// Get all locations
router.get('/locations', async (req, res) => {
  try {
    const locations = await Location.find();
    res.send(locations);
  } catch (error) {
    res.status(500).send(error);
  }
});

module.exports = router;
