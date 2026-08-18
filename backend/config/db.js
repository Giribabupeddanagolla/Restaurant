const mongoose = require('mongoose');

// Disable buffering so queries fail fast if MongoDB is not connected
mongoose.set('bufferCommands', false);

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/giri_restaurant', {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Info: ${error.message}`);
  }
};

module.exports = connectDB;
