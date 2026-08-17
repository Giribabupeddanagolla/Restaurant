const Merchant = require('../models/Merchant');
const Category = require('../models/Category');
const SubCategory = require('../models/SubCategory');
const MenuItem = require('../models/MenuItem');
const Order = require('../models/Order');

// GET /api/v1/merchant/profile
exports.getProfile = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id;
    const merchant = await Merchant.findById(merchantId);
    if (!merchant) {
      return res.status(404).json({ success: false, message: 'Merchant profile not found' });
    }
    return res.status(200).json({ success: true, data: merchant });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/merchant/profile
exports.updateProfile = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id;
    const merchant = await Merchant.findByIdAndUpdate(merchantId, req.body, { new: true, runValidators: true });
    if (!merchant) {
      return res.status(404).json({ success: false, message: 'Merchant profile not found' });
    }
    return res.status(200).json({ success: true, message: 'Shop details saved successfully.', data: merchant });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Categories Management (Scoped by merchantId)
exports.getCategories = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const categories = await Category.find({ merchantId });
    return res.status(200).json({ success: true, count: categories.length, data: categories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createCategory = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const { name, image, description, status } = req.body;
    
    // Check duplicate
    const existing = await Category.findOne({ merchantId, name: new RegExp(`^${name}$`, 'i') });
    if (existing) {
      return res.status(400).json({ success: false, message: 'Category already exists for your shop.' });
    }

    const category = await Category.create({ merchantId, name, image, description, status: status || 'Active' });
    return res.status(201).json({ success: true, message: 'Category created.', data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateCategory = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const category = await Category.findOneAndUpdate({ _id: req.params.id, merchantId }, req.body, { new: true });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found or unauthorized.' });
    }
    return res.status(200).json({ success: true, message: 'Category updated.', data: category });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteCategory = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const category = await Category.findOneAndDelete({ _id: req.params.id, merchantId });
    if (!category) {
      return res.status(404).json({ success: false, message: 'Category not found or unauthorized.' });
    }
    return res.status(200).json({ success: true, message: 'Category deleted.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// SubCategories Management
exports.getSubCategories = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const subcategories = await SubCategory.find({ merchantId });
    return res.status(200).json({ success: true, count: subcategories.length, data: subcategories });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createSubCategory = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const { categoryId, name, image, description, status } = req.body;
    const subcategory = await SubCategory.create({ merchantId, categoryId, name, image, description, status: status || 'Active' });
    return res.status(201).json({ success: true, message: 'SubCategory created.', data: subcategory });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// Dishes / Price Management (Scoped by merchantId)
exports.getDishes = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const dishes = await MenuItem.find({ merchantId });
    return res.status(200).json({ success: true, count: dishes.length, data: dishes });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.createDish = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const { name, category, subCategory, price, discount, tax, image, description, foodType, spiceLevel, preparationTime, isAvailable } = req.body;

    const numPrice = Number(price) || 0;
    const numDiscount = Number(discount) || 0;
    if (numPrice < 0 || numDiscount < 0) {
      return res.status(400).json({ success: false, message: 'Price and discount cannot be negative.' });
    }
    const finalPrice = Math.max(0, numPrice - numDiscount);

    const dish = await MenuItem.create({
      merchantId,
      name,
      category,
      subCategory,
      price: numPrice,
      discount: numDiscount,
      finalPrice,
      tax: Number(tax) || 0,
      image,
      description,
      dietary: [foodType?.toLowerCase() || 'non-veg'],
      foodType: foodType || 'Non-Veg',
      spiceLevel: spiceLevel || 'Medium',
      preparationTime: preparationTime || '20 mins',
      available: isAvailable !== false
    });

    return res.status(201).json({ success: true, message: 'Dish created.', data: dish });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.updateDish = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const dish = await MenuItem.findOneAndUpdate({ _id: req.params.id, merchantId }, req.body, { new: true });
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found or unauthorized.' });
    }
    return res.status(200).json({ success: true, message: 'Dish updated.', data: dish });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

exports.deleteDish = async (req, res) => {
  try {
    const merchantId = req.user?.merchantId || req.user?._id || 'demo_merchant';
    const dish = await MenuItem.findOneAndDelete({ _id: req.params.id, merchantId });
    if (!dish) {
      return res.status(404).json({ success: false, message: 'Dish not found or unauthorized.' });
    }
    return res.status(200).json({ success: true, message: 'Dish deleted.' });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
