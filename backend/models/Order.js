const mongoose = require('mongoose');

const orderItemSchema = new mongoose.Schema({
  menuItemId: { type: mongoose.Schema.Types.Mixed },
  name: { type: String, default: 'Dish Item' },
  title: { type: String, default: '' },
  price: { type: Number, default: 0 },
  quantity: { type: Number, default: 1, min: 1 },
  subtotal: { type: Number, default: 0 },
  notes: { type: String, default: '' },
});

const orderSchema = new mongoose.Schema({
  orderNumber: { type: String, required: true, unique: true },
  customer: {
    name: { type: String, default: 'Guest Customer' },
    phone: { type: String, default: 'N/A' },
    email: { type: String, default: '' },
    tableNumber: { type: String, default: 'Dine-In' },
  },
  shopId: { type: String, default: '' },
  merchantId: { type: String, default: '' },
  shopName: { type: String, default: '' },
  items: [orderItemSchema],
  totalAmount: { type: Number, default: 0 },
  taxAmount: { type: Number, default: 0 },
  discountAmount: { type: Number, default: 0 },
  finalAmount: { type: Number, default: 0 },
  orderType: { type: String, default: 'Dine-In' },
  status: {
    type: String,
    enum: ['Pending', 'Confirmed', 'Preparing', 'Ready', 'Served', 'Delivered', 'Cancelled'],
    default: 'Pending',
  },
  paymentStatus: {
    type: String,
    enum: ['Pending', 'Paid', 'Failed', 'Refunded'],
    default: 'Pending',
  },
  paymentMethod: { type: String, default: 'UPI' },
  paymentDetails: { type: Object, default: {} },
}, { timestamps: true });

orderSchema.index({ status: 1 });
orderSchema.index({ paymentStatus: 1 });
orderSchema.index({ createdAt: -1 });

module.exports = mongoose.model('Order', orderSchema);
