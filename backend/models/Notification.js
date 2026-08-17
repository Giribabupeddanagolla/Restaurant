const mongoose = require('mongoose');

const notificationSchema = new mongoose.Schema({
  userId: { type: String, required: true, index: true },
  merchantId: { type: String, default: '', index: true },
  type: { type: String, default: 'merchant_approval' },
  title: { type: String, required: true },
  message: { type: String, required: true },
  isRead: { type: Boolean, default: false }
}, { timestamps: true });

notificationSchema.index({ userId: 1, isRead: 1 });

module.exports = mongoose.models.Notification || mongoose.model('Notification', notificationSchema);
