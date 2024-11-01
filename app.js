const express = require('express');
const connectDB = require('./config/db');
const chargingStations = require('./routes/chargingStations');
const services = require('./routes/services');
const bookings = require('./routes/bookings');
const userRoutes = require('./routes/userRoutes'); // Import user routes

connectDB();

const app = express();
app.use(express.json());

// Routes
app.use('/api/charging-stations', chargingStations);
app.use('/api/services', services);
app.use('/api/bookings', bookings);
app.use('/api/user', userRoutes); // Add user routes

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
