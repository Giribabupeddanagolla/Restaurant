const Customer = require('../models/Customer');

exports.getCustomers = async (req, res, next) => {
  try {
    const customers = await Customer.find().sort('-totalSpent');
    res.status(200).json({ success: true, count: customers.length, data: customers });
  } catch (err) {
    next(err);
  }
};
