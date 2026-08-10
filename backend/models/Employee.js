const mongoose = require('mongoose');

const employeeSchema = new mongoose.Schema({
  employeeId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  role: { type: String, enum: ['Admin', 'Manager', 'Cashier', 'Chef', 'Waiter', 'Delivery Boy'], required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  salary: { type: Number, required: true },
  status: { type: String, enum: ['Active', 'On Leave', 'Terminated'], default: 'Active' },
  joinDate: { type: Date, default: Date.now },
}, { timestamps: true });

module.exports = mongoose.model('Employee', employeeSchema);
