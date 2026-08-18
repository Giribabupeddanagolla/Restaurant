const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const errorHandler = require('./middleware/errorHandler');

// Route imports
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const orderRoutes = require('./routes/orderRoutes');
const reservationRoutes = require('./routes/reservationRoutes');
const customerRoutes = require('./routes/customerRoutes');
const employeeRoutes = require('./routes/employeeRoutes');
const inventoryRoutes = require('./routes/inventoryRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

const tableRoutes = require('./routes/tableRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const shopRoutes = require('./routes/shopRoutes');
const adminMerchantRoutes = require('./routes/adminMerchantRoutes');
const merchantRoutes = require('./routes/merchantRoutes');
const emailRoutes = require('./routes/emailRoutes');

dotenv.config();

const app = express();

// Enable CORS & JSON parsing
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Health Check API
app.get('/api/health', (req, res) => {
  res.status(200).json({ status: 'OK', message: 'Giri Restaurant MERN Backend API Operational' });
});

// API Routes
app.use('/api/v1/auth', authRoutes);
app.use('/api/v1/menu', menuRoutes);
app.use('/api/v1/categories', categoryRoutes);
app.use('/api/v1/orders', orderRoutes);
app.use('/api/v1/reservations', reservationRoutes);
app.use('/api/v1/tables', tableRoutes);
app.use('/api/v1/payments', paymentRoutes);
app.use('/api/v1/customers', customerRoutes);
app.use('/api/v1/employees', employeeRoutes);
app.use('/api/v1/inventory', inventoryRoutes);
app.use('/api/v1/dashboard', dashboardRoutes);
app.use('/api/v1/shops', shopRoutes);
app.use('/api/v1/restaurants', shopRoutes);
app.use('/api/restaurants', shopRoutes);
app.use('/api/v1/admin/merchants', adminMerchantRoutes);
app.use('/api/v1/merchant', merchantRoutes);
app.use('/api/v1/email', emailRoutes);
app.use('/api/email', emailRoutes);

// Global Error Handler
app.use(errorHandler);

module.exports = app;
