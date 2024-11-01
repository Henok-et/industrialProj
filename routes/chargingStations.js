const express = require('express');
const router = express.Router();
const ChargingStation = require('../models/ChargingStation');

// Add a new charging station
router.post('/', async (req, res) => {
   try {
      const station = new ChargingStation(req.body);
      await station.save();
      res.status(201).json(station);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// Get all charging stations
router.get('/', async (req, res) => {
   try {
      const stations = await ChargingStation.find();
      res.json(stations);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;

