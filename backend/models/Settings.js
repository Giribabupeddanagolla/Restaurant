const mongoose = require('mongoose');

const settingsSchema = new mongoose.Schema({
  restaurantName: { type: String, default: 'Royal Restaurant' },
  tagline: { type: String, default: 'Artisanal Dining & Mobile Ordering' },
  taxRatePercent: { type: Number, default: 5 },
  serviceChargePercent: { type: Number, default: 5 },
  currencySymbol: { type: String, default: '₹' },
  contactPhone: { type: String, default: '+91 98765 43210' },
  contactEmail: { type: String, default: 'info@royalrestaurant.com' },
  address: { type: String, default: '123 Gourmet Avenue, Culinary District' },
}, { timestamps: true });

module.exports = mongoose.model('Settings', settingsSchema);
