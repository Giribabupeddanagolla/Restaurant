const Merchant = require('../models/Merchant');
const Notification = require('../models/Notification');

// GET /api/v1/admin/merchants
exports.getMerchants = async (req, res) => {
  try {
    const { status } = req.query;
    let query = {};
    if (status && status !== 'all' && status !== 'All') {
      query.status = status.toLowerCase();
    }
    const merchants = await Merchant.find(query).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: merchants.length, data: merchants });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/admin/merchants/pending
exports.getPendingMerchants = async (req, res) => {
  try {
    const merchants = await Merchant.find({ status: 'pending' }).sort({ createdAt: -1 });
    return res.status(200).json({ success: true, count: merchants.length, data: merchants });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET /api/v1/admin/merchants/:id
exports.getMerchantById = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) {
      return res.status(404).json({ success: false, message: 'Merchant not found' });
    }
    return res.status(200).json({ success: true, data: merchant });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/admin/merchants/:id/approve
exports.approveMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) {
      return res.status(404).json({ success: false, message: 'Merchant not found' });
    }

    merchant.status = 'approved';
    merchant.isApproved = true;
    merchant.isActive = true;
    merchant.approvedAt = new Date();
    merchant.approvedBy = req.user?.email || 'Admin';

    await merchant.save();

    // Create Notification
    await Notification.create({
      userId: merchant._id.toString(),
      merchantId: merchant._id.toString(),
      type: 'merchant_approval',
      title: '🎉 Merchant Approval Successful!',
      message: 'Your merchant registration has been approved by Admin. You can now access your Merchant Dashboard and add your shop details, food categories, dishes, prices, images, and availability.',
      isRead: false
    });

    return res.status(200).json({
      success: true,
      message: 'Merchant approved successfully.',
      data: merchant
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/admin/merchants/:id/reject
exports.rejectMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) {
      return res.status(404).json({ success: false, message: 'Merchant not found' });
    }

    merchant.status = 'rejected';
    merchant.isApproved = false;
    merchant.isActive = false;

    await merchant.save();

    return res.status(200).json({
      success: true,
      message: 'Merchant request rejected.',
      data: merchant
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};

// PUT /api/v1/admin/merchants/:id/suspend
exports.suspendMerchant = async (req, res) => {
  try {
    const merchant = await Merchant.findById(req.params.id);
    if (!merchant) {
      return res.status(404).json({ success: false, message: 'Merchant not found' });
    }

    merchant.status = 'suspended';
    merchant.isActive = false;

    await merchant.save();

    return res.status(200).json({
      success: true,
      message: 'Merchant account suspended.',
      data: merchant
    });
  } catch (error) {
    return res.status(500).json({ success: false, message: error.message });
  }
};
