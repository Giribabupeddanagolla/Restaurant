const authorize = (...roles) => {
  return (req, res, next) => {
    if (!req.user || !roles.includes(req.user.role)) {
      return res.status(403).json({
        success: false,
        message: `Role (${req.user?.role || 'Guest'}) is not authorized to access this resource`
      });
    }
    next();
  };
};

const verifyMerchantOwnership = (req, res, next) => {
  if (req.user && (req.user.role === 'Admin' || req.user.role === 'SUPER_ADMIN')) {
    return next();
  }
  if (!req.user || req.user.role !== 'Merchant') {
    return res.status(403).json({ success: false, message: 'Access denied: Merchant role required' });
  }
  const targetMerchantId = req.params.merchantId || req.body.merchantId || req.query.merchantId;
  if (targetMerchantId && req.user.merchantId && targetMerchantId.toString() !== req.user.merchantId.toString()) {
    return res.status(403).json({ success: false, message: 'Forbidden: Cannot access another merchant resources' });
  }
  next();
};

module.exports = { authorize, verifyMerchantOwnership };
