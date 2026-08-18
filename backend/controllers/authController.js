const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { sendWelcomeEmail, sendLoginAlertEmail } = require('../services/emailService');

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET || 'giri_restaurant_secret_key', {
    expiresIn: process.env.JWT_EXPIRE || '30d',
  });
};

exports.register = async (req, res, next) => {
  try {
    const { name, email, password, phone, role } = req.body;
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ success: false, message: 'User already exists' });
    }

    user = await User.create({ name, email, password, phone, role: role || 'Customer' });
    const token = generateToken(user._id);

    // Asynchronously dispatch welcome email (non-blocking)
    sendWelcomeEmail({ email: user.email, name: user.name }).catch((err) =>
      console.error('Welcome email error:', err.message)
    );

    res.status(201).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    next(err);
  }
};

exports.login = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ success: false, message: 'Please provide email and password' });
    }

    const user = await User.findOne({ email }).select('+password');
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ success: false, message: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    // Send login alert notification to the user's email and admin
    sendLoginAlertEmail({
      email: user.email,
      name: user.name,
      role: user.role,
      ipAddress: req.ip || req.headers['x-forwarded-for'],
      userAgent: req.headers['user-agent'],
    }).catch((err) => console.error('Login email notification error:', err.message));

    res.status(200).json({
      success: true,
      token,
      user: { id: user._id, name: user.name, email: user.email, role: user.role, phone: user.phone },
    });
  } catch (err) {
    next(err);
  }
};

exports.getMe = async (req, res, next) => {
  try {
    const user = await User.findById(req.user.id || req.user._id);
    res.status(200).json({ success: true, user });
  } catch (err) {
    next(err);
  }
};
