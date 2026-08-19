const mongoose = require('mongoose');
const MenuItem = require('../models/MenuItem');

exports.getMenuItems = async (req, res, next) => {
  try {
    if (mongoose.connection.readyState !== 1) {
      return res.status(200).json({ success: true, count: 0, data: [] });
    }
    const { category, search, diet, shopId, merchantId, categoryId, subCategoryId, shop } = req.query;
    let query = { isAvailable: { $ne: false } };

    if (shopId) query.shopId = shopId;
    if (merchantId) query.merchantId = merchantId;
    if (categoryId) query.categoryId = categoryId;
    if (subCategoryId) query.subCategoryId = subCategoryId;
    if (category && category !== 'all') query.category = category;
    if (search) query.name = { $regex: search, $options: 'i' };
    if (diet && diet !== 'all') query.dietary = diet;

    if (shop) {
      const shopRegex = new RegExp(shop.replace(/\s+/g, '.*'), 'i');
      query.$or = [{ shopName: shopRegex }, { shopSlug: shopRegex }, { shopId: shop }];
    }

    const items = await MenuItem.find(query);
    res.status(200).json({ success: true, count: items.length, data: items });
  } catch (err) {
    res.status(200).json({ success: true, count: 0, data: [] });
  }
};

exports.getMenuItemById = async (req, res, next) => {
  try {
    const item = await MenuItem.findById(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.createMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.create(req.body);
    res.status(201).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.updateMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, data: item });
  } catch (err) {
    next(err);
  }
};

exports.deleteMenuItem = async (req, res, next) => {
  try {
    const item = await MenuItem.findByIdAndDelete(req.params.id);
    if (!item) return res.status(404).json({ success: false, message: 'Item not found' });
    res.status(200).json({ success: true, message: 'Item deleted' });
  } catch (err) {
    next(err);
  }
};
