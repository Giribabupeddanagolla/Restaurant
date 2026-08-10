const validateCreateOrder = (req, res, next) => {
  const { items, finalAmount } = req.body;
  if (!items || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ success: false, message: 'Order must contain at least one item' });
  }
  if (!finalAmount || finalAmount <= 0) {
    return res.status(400).json({ success: false, message: 'Valid final amount is required' });
  }
  next();
};

module.exports = { validateCreateOrder };
