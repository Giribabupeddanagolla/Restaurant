const mongoose = require('mongoose');

const supplierSchema = new mongoose.Schema({
  name: { type: String, required: true, trim: true },
  contactPerson: { type: String, default: '' },
  phone: { type: String, required: true },
  email: { type: String, default: '' },
  categorySupplied: { type: String, default: 'General' },
  address: { type: String, default: '' },
}, { timestamps: true });

module.exports = mongoose.model('Supplier', supplierSchema);
