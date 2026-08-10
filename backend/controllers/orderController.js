const Order = require('../models/Order');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort('-createdAt');
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const orderNumber = `GIRI-${Date.now().toString().slice(-6)}`;
    const newOrder = await Order.create({ ...req.body, orderNumber });
    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });
    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};
