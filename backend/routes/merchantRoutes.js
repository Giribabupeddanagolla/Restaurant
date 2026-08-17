const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const {
  getProfile,
  updateProfile,
  getCategories,
  createCategory,
  updateCategory,
  deleteCategory,
  getSubCategories,
  createSubCategory,
  getDishes,
  createDish,
  updateDish,
  deleteDish
} = require('../controllers/merchantController');

router.get('/profile', protect, authorize('Merchant', 'Admin'), getProfile);
router.put('/profile', protect, authorize('Merchant', 'Admin'), updateProfile);

router.get('/categories', protect, authorize('Merchant', 'Admin'), getCategories);
router.post('/categories', protect, authorize('Merchant', 'Admin'), createCategory);
router.put('/categories/:id', protect, authorize('Merchant', 'Admin'), updateCategory);
router.delete('/categories/:id', protect, authorize('Merchant', 'Admin'), deleteCategory);

router.get('/subcategories', protect, authorize('Merchant', 'Admin'), getSubCategories);
router.post('/subcategories', protect, authorize('Merchant', 'Admin'), createSubCategory);

router.get('/dishes', protect, authorize('Merchant', 'Admin'), getDishes);
router.post('/dishes', protect, authorize('Merchant', 'Admin'), createDish);
router.put('/dishes/:id', protect, authorize('Merchant', 'Admin'), updateDish);
router.delete('/dishes/:id', protect, authorize('Merchant', 'Admin'), deleteDish);

module.exports = router;
