const jwt = require('jsonwebtoken');
const User = require('../models/User');

const protect = async (req, res, next) => {
  let token;

  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {
      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET || 'giri_restaurant_secret_key');
      req.user = await User.findById(decoded.id).select('-password');
      return next();
    } catch (error) {
      return res.status(401).json({ success: false, message: 'Not authorized, invalid token' });
    }
  }

  // Fallback demo user for local development if token is omitted
  if (process.env.NODE_ENV !== 'production' && !token) {
    req.user = { _id: 'demo_user_id', name: 'Demo Admin', role: 'Admin', email: 'admin@girirestaurant.com' };
    return next();
  }

  return res.status(401).json({ success: false, message: 'Not authorized, token missing' });
};

module.exports = { protect };
