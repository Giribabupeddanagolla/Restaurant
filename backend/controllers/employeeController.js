const Employee = require('../models/Employee');

exports.getEmployees = async (req, res, next) => {
  try {
    const employees = await Employee.find();
    res.status(200).json({ success: true, count: employees.length, data: employees });
  } catch (err) {
    next(err);
  }
};
