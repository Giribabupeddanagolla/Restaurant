const Reservation = require('../models/Reservation');
const { sendReservationEmail } = require('../services/emailService');

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

    if (reservation.email || req.body.email) {
      sendReservationEmail({
        email: reservation.email || req.body.email,
        name: reservation.name || req.body.name || 'Guest',
        resId: reservation.resId,
        date: reservation.date || req.body.date,
        time: reservation.time || req.body.time,
        guests: reservation.guests || req.body.guests,
        status: reservation.status || 'Confirmed',
      }).catch((err) => console.error('Reservation creation email error:', err.message));
    }

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

    if (reservation.email) {
      sendReservationEmail({
        email: reservation.email,
        name: reservation.name || 'Guest',
        resId: reservation.resId,
        date: reservation.date,
        time: reservation.time,
        guests: reservation.guests,
        status: reservation.status,
      }).catch((err) => console.error('Reservation update email error:', err.message));
    }

    res.status(200).json({ success: true, data: reservation });
  } catch (err) {
    next(err);
  }
};
