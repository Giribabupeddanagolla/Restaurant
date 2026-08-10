const Reservation = require('../models/Reservation');

exports.getReservations = async (req, res, next) => {
  try {
    const reservations = await Reservation.find().sort('-createdAt');
    res.status(200).json({ success: true, count: reservations.length, data: reservations });
  } catch (err) {
    next(err);
  }
};

exports.createReservation = async (req, res, next) => {
  try {
    const resId = `RES-${Math.floor(1000 + Math.random() * 9000)}`;
    const reservation = await Reservation.create({ ...req.body, resId });
    res.status(201).json({ success: true, data: reservation });
  } catch (err) {
    next(err);
  }
};

exports.updateReservationStatus = async (req, res, next) => {
  try {
    const { status } = req.body;
    const reservation = await Reservation.findByIdAndUpdate(req.params.id, { status }, { new: true });
    if (!reservation) return res.status(404).json({ success: false, message: 'Reservation not found' });
    res.status(200).json({ success: true, data: reservation });
  } catch (err) {
    next(err);
  }
};
