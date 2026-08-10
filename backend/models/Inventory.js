const mongoose = require('mongoose');

const inventorySchema = new mongoose.Schema({
  itemName: { type: String, required: true, trim: true },
  category: { type: String, required: true },
  quantity: { type: Number, required: true, min: 0 },
  unit: { type: String, required: true },
  minThreshold: { type: Number, required: true, default: 5 },
  unitPrice: { type: Number, required: true },
  supplier: { type: String, default: 'Local Market' },
  status: { type: String, enum: ['In Stock', 'Low Stock', 'Out of Stock'], default: 'In Stock' },
}, { timestamps: true });

module.exports = mongoose.model('Inventory', inventorySchema);
