const mongoose = require('mongoose');

const merchantSchema = new mongoose.Schema({
  businessName: { type: String, required: true, trim: true },
  shopName: { type: String, required: true, trim: true },
  ownerName: { type: String, required: true, trim: true },
  email: { type: String, required: true, trim: true, lowercase: true },
  phone: { type: String, required: true, trim: true },
  address: { type: String, default: '' },
  area: { type: String, default: '' },
  city: { type: String, default: 'Metropolitan City' },
  state: { type: String, default: '' },
  pincode: { type: String, default: '' },
  category: { type: String, default: 'Multi-Cuisine' },
  status: {
    type: String,
    enum: ['pending', 'approved', 'rejected', 'suspended'],
    default: 'pending'
  },
  isApproved: { type: Boolean, default: false },
  isActive: { type: Boolean, default: false },
  approvedAt: { type: Date, default: null },
  approvedBy: { type: String, default: '' },
  commissionRate: { type: Number, default: 15.0 },
  logo: { type: String, default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=400&auto=format&fit=crop&q=85' },
  banner: { type: String, default: 'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1200&auto=format&fit=crop&q=85' },
  description: { type: String, default: 'Authentic restaurant serving delicious gourmet meals.' },
  openingTime: { type: String, default: '10:00 AM' },
  closingTime: { type: String, default: '11:00 PM' },
  deliveryTime: { type: String, default: '25-35 mins' },
  minimumOrderAmount: { type: Number, default: 150 },
  restaurantStatus: {
    type: String,
    enum: ['Open', 'Closed', 'Temporarily Closed'],
    default: 'Open'
  }
}, { timestamps: true });

merchantSchema.index({ shopName: 'text', email: 1, status: 1 });

module.exports = mongoose.models.Merchant || mongoose.model('Merchant', merchantSchema);
