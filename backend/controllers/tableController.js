const Table = require('../models/Table');

exports.getTables = async (req, res, next) => {
  try {
    const tables = await Table.find().sort('tableNumber');
    res.status(200).json({ success: true, count: tables.length, data: tables });
  } catch (err) {
    next(err);
  }
};

exports.updateTableStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const table = await Table.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!table) return res.status(404).json({ success: false, message: 'Table not found' });
    res.status(200).json({ success: true, data: table });
  } catch (err) {
    next(err);
  }
};
