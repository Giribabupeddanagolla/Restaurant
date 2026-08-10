const express = require('express');
const router = express.Router();
const { getMenuItems, getMenuItemById, createMenuItem, updateMenuItem, deleteMenuItem } = require('../controllers/menuController');
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');

router.get('/', getMenuItems);
router.get('/:id', getMenuItemById);
router.post('/', protect, authorize('Admin', 'Manager'), createMenuItem);
router.put('/:id', protect, authorize('Admin', 'Manager'), updateMenuItem);
router.delete('/:id', protect, authorize('Admin', 'Manager'), deleteMenuItem);

module.exports = router;
