const { createRazorpayOrder } = require('../services/paymentService');
const Payment = require('../models/Payment');

exports.initiatePayment = async (req, res, next) => {
  try {
    const { amount, orderId } = req.body;
    const razorpayOrder = await createRazorpayOrder(amount);
    
    const paymentId = razorpayOrder.id || `PAY-${Date.now()}`;
    const paymentData = {
      paymentId,
      orderId: orderId || `ORD-${Date.now()}`,
      amount: amount || 0,
      method: 'Razorpay',
      status: 'Pending',
    };

    // Save payment log asynchronously to prevent blocking response
    Payment.create(paymentData).catch((e) => console.error('Payment DB log error:', e));

    res.status(200).json({ success: true, razorpayOrder, payment: paymentData });
  } catch (err) {
    next(err);
  }
};
