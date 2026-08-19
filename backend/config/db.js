const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/giri_restaurant_db', {
      serverSelectionTimeoutMS: 2000,
    });
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`MongoDB Connection Warning: ${error.message}`);
    try {
      console.log('Attempting local MongoDB connection (mongodb://127.0.0.1:27017/giri_restaurant_db)...');
      const localConn = await mongoose.connect('mongodb://127.0.0.1:27017/giri_restaurant_db', {
        serverSelectionTimeoutMS: 1500,
      });
      console.log(`Local MongoDB Connected: ${localConn.connection.host}`);
    } catch (localErr) {
      console.log('Backend running in resilient mode (API endpoints active). Disabling Mongoose buffering.');
      mongoose.set('bufferCommands', false);
    }
  }
};

module.exports = connectDB;
