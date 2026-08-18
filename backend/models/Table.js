const mongoose = require('mongoose');

const tableSchema = new mongoose.Schema({
  tableNumber: { type: String, required: true },
  shopId: { type: String, default: '' },
  merchantId: { type: String, default: '' },
  capacity: { type: Number, required: true },
  section: { type: String, enum: ['Main Dining', 'Patio', 'VIP Lounge', 'Bar'], default: 'Main Dining' },
  status: { type: String, enum: ['Available', 'Occupied', 'Reserved', 'Cleaning'], default: 'Available' },
  currentOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
}, { timestamps: true });

module.exports = mongoose.model('Table', tableSchema);
