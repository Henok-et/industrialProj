const mongoose = require('mongoose');
require('dotenv').config();  // Load environment variables from .env

const connectDB = async () => {
   try {
      await mongoose.connect(process.env.MONGODB_URI);  // Connect without deprecated options
      console.log('MongoDB connected successfully');
   } catch (error) {
      console.error('MongoDB connection failed:', error.message);
      process.exit(1);  // Exit the app if unable to connect
   }
};

module.exports = connectDB;
