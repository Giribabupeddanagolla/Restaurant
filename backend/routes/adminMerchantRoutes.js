const express = require('express');
const router = express.Router();
const { protect } = require('../middleware/auth');
const { authorize } = require('../middleware/rbac');
const {
  getMerchants,
  getPendingMerchants,
  getMerchantById,
  approveMerchant,
  rejectMerchant,
  suspendMerchant
} = require('../controllers/adminMerchantController');

router.get('/', protect, authorize('Admin', 'SUPER_ADMIN'), getMerchants);
router.get('/pending', protect, authorize('Admin', 'SUPER_ADMIN'), getPendingMerchants);
router.get('/:id', protect, authorize('Admin', 'SUPER_ADMIN'), getMerchantById);
router.put('/:id/approve', protect, authorize('Admin', 'SUPER_ADMIN'), approveMerchant);
router.put('/:id/reject', protect, authorize('Admin', 'SUPER_ADMIN'), rejectMerchant);
router.put('/:id/suspend', protect, authorize('Admin', 'SUPER_ADMIN'), suspendMerchant);

module.exports = router;
