const mongoose = require('mongoose');

const subCategorySchema = new mongoose.Schema({
  merchantId: { type: String, required: true, index: true },
  categoryId: { type: String, required: true, index: true },
  name: { type: String, required: true, trim: true },
  image: { type: String, default: '' },
  description: { type: String, default: '' },
  status: { type: String, enum: ['Active', 'Inactive'], default: 'Active' }
}, { timestamps: true });

subCategorySchema.index({ merchantId: 1, categoryId: 1, name: 1 });

module.exports = mongoose.models.SubCategory || mongoose.model('SubCategory', subCategorySchema);
