const express = require('express');
const router = express.Router();
const Booking = require('../models/Booking');

// Create a new booking
router.post('/', async (req, res) => {
   try {
      const booking = new Booking(req.body);
      await booking.save();
      res.status(201).json(booking);
   } catch (error) {
      res.status(400).json({ message: error.message });
   }
});

// Get all bookings for a user
router.get('/:userId', async (req, res) => {
   try {
      const bookings = await Booking.find({ userId: req.params.userId });
      res.json(bookings);
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
