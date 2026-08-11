const mongoose = require('mongoose');

const shopSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  tagline: { type: String, trim: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.8, min: 0, max: 5 },
  deliveryTime: { type: String, default: '20-30 min' },
  address: { type: String, required: true },
  city: { type: String, required: true, default: 'Metropolitan City' },
  phone: { type: String, default: '+1 (555) 987-6543' },
  openingHours: { type: String, default: '11:00 AM - 11:00 PM' },
  isOpen: { type: Boolean, default: true },
  isFeatured: { type: Boolean, default: true },
  mapUrl: { type: String, default: '' },
  diningImages: [{ type: String }],
  kitchenImages: [{ type: String }],
}, { timestamps: true });

shopSchema.index({ name: 'text', city: 'text', address: 'text' });

module.exports = mongoose.model('Shop', shopSchema);
