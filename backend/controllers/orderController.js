const Order = require('../models/Order');
const { sendOrderReceiptEmail } = require('../services/emailService');

exports.getOrders = async (req, res, next) => {
  try {
    const orders = await Order.find().sort('-createdAt').lean();
    res.status(200).json({ success: true, count: orders.length, data: orders });
  } catch (err) {
    next(err);
  }
};

exports.createOrder = async (req, res, next) => {
  try {
    const orderNumber = req.body.orderNumber || `GIRI-${Date.now().toString().slice(-6)}`;
    const newOrder = await Order.create({ ...req.body, orderNumber });

    const customerEmail = newOrder.customerEmail || req.body.customerEmail || req.body.email;
    if (customerEmail) {
      sendOrderReceiptEmail({
        email: customerEmail,
        name: newOrder.customerName || req.body.customerName || 'Valued Customer',
        orderNumber: newOrder.orderNumber,
        items: newOrder.items || req.body.items || [],
        totalAmount: newOrder.totalAmount || req.body.totalAmount || 0,
        status: newOrder.status || 'Placed',
      }).catch((err) => console.error('Order creation receipt email error:', err.message));
    }

    res.status(201).json({ success: true, data: newOrder });
  } catch (err) {
    next(err);
  }
};

exports.updateOrderStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const order = await Order.findByIdAndUpdate(req.params.id, { status }, { new: true }).lean();
    if (!order) return res.status(404).json({ success: false, message: 'Order not found' });

    const customerEmail = order.customerEmail || req.body.customerEmail || req.body.email;
    if (customerEmail) {
      sendOrderReceiptEmail({
        email: customerEmail,
        name: order.customerName || 'Valued Customer',
        orderNumber: order.orderNumber,
        items: order.items || [],
        totalAmount: order.totalAmount || 0,
        status: order.status,
      }).catch((err) => console.error('Order status update email error:', err.message));
    }

    res.status(200).json({ success: true, data: order });
  } catch (err) {
    next(err);
  }
};
