const Inventory = require('../models/Inventory');

exports.getInventory = async (req, res, next) => {
  try {
    const inventory = await Inventory.find();
    res.status(200).json({ success: true, count: inventory.length, data: inventory });
  } catch (err) {
    next(err);
  }
};
