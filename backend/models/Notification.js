const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  title: { type: String, required: true },
  message: { type: String, required: true },
  type: { type: String, enum: ['Order', 'Reservation', 'Inventory', 'System'], default: 'Order' },
  isRead: { type: Boolean, default: false },
  recipientRole: { type: String, default: 'Admin' },
}, { timestamps: true });

module.exports = mongoose.model('Notification', notificationSchema);
