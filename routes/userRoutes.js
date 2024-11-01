const express = require('express');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const router = express.Router();

// User Registration
router.post('/register', async (req, res) => {
   const { name, email, password,role } = req.body;

   try {
      const userExists = await User.findOne({ email });
      if (userExists) {
         return res.status(400).json({ message: 'User already exists' });
      }

      const user = new User({ name, email, password, role });
      await user.save();
      res.status(201).json({ message: 'User registered successfully' });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

// User Login
router.post('/login', async (req, res) => {
   const { email, password } = req.body;

   try {
      const user = await User.findOne({ email });
      if (!user || !(await user.matchPassword(password))) {
         return res.status(401).json({ message: 'Invalid credentials' });
      }

      // Generate JWT
      const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '30d' });
      res.json({ token });
   } catch (error) {
      res.status(500).json({ message: error.message });
   }
});

module.exports = router;
