const mongoose = require('mongoose');

const reservationSchema = new mongoose.Schema({
  resId: { type: String, required: true, unique: true },
  name: { type: String, required: true },
  phone: { type: String, required: true },
  email: { type: String, required: true },
  guests: { type: Number, required: true, min: 1 },
  date: { type: String, required: true },
  time: { type: String, required: true },
  tableId: { type: String, default: 'Unassigned' },
  tableNumber: { type: String, default: 'Table 01' },
  shopId: { type: String, default: '' },
  merchantId: { type: String, default: '' },
  restaurantName: { type: String, default: 'Giri Spice Garden' },
  address: { type: String, default: 'Hyderabad' },
  specialRequests: { type: String, default: '' },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Seated', 'Completed', 'Cancelled'],
    default: 'Pending',
  },
}, { timestamps: true });

module.exports = mongoose.model('Reservation', reservationSchema);
