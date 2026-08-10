const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  slug: { type: String, required: true, unique: true },
  category: { type: String, required: true },
  price: { type: Number, required: true, min: 0 },
  originalPrice: { type: Number },
  description: { type: String, required: true },
  image: { type: String, required: true },
  rating: { type: Number, default: 4.8 },
  prepTime: { type: String, default: '15-20 min' },
  isVeg: { type: Boolean, default: false },
  dietary: [{ type: String }],
  spicyLevel: { type: Number, default: 1 },
  isPopular: { type: Boolean, default: false },
  isAvailable: { type: Boolean, default: true },
}, { timestamps: true });

menuItemSchema.index({ category: 1, isAvailable: 1 });
menuItemSchema.index({ name: 'text', description: 'text' });

module.exports = mongoose.model('MenuItem', menuItemSchema);
