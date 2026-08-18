const {
  sendEmail,
  sendWelcomeEmail,
  sendReservationEmail,
  sendOrderReceiptEmail,
  sendContactEmail,
  verifyTransporter,
} = require('../services/emailService');

/**
 * @desc Verify Nodemailer SMTP Transporter Connection
 * @route GET /api/v1/email/verify
 * @access Public / Admin
 */
exports.verifyEmailSetup = async (req, res, next) => {
  try {
    const result = await verifyTransporter();
    if (result.success) {
      return res.status(200).json({
        success: true,
        message: result.message,
        emailUser: process.env.EMAIL_USER || process.env.SMTP_USER,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'SMTP Transporter Connection Failed',
        error: result.error,
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Send Test Email
 * @route POST /api/v1/email/send-test
 * @access Public / Admin
 */
exports.sendTestEmail = async (req, res, next) => {
  try {
    const { email, name, type } = req.body;
    const recipient = email || process.env.EMAIL_USER || process.env.SMTP_USER;
    const recipientName = name || 'Test User';

    let result;
    if (type === 'welcome') {
      result = await sendWelcomeEmail({ email: recipient, name: recipientName });
    } else if (type === 'reservation') {
      result = await sendReservationEmail({
        email: recipient,
        name: recipientName,
        resId: 'RES-9999',
        date: new Date().toLocaleDateString(),
        time: '19:30',
        guests: 4,
        status: 'Confirmed',
      });
    } else if (type === 'order') {
      result = await sendOrderReceiptEmail({
        email: recipient,
        name: recipientName,
        orderNumber: 'GIRI-TEST-101',
        items: [{ name: 'Paneer Butter Masala', price: 280, quantity: 2 }, { name: 'Butter Naan', price: 40, quantity: 4 }],
        totalAmount: 720,
        status: 'Placed',
      });
    } else {
      result = await sendEmail({
        email: recipient,
        subject: 'Nodemailer Test Email - Giri Restaurant 🍽️',
        message: 'Congratulations! Nodemailer email service is correctly configured and operational.',
      });
    }

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: `Test email successfully sent to ${recipient}`,
        messageId: result.messageId,
      });
    } else {
      return res.status(500).json({
        success: false,
        message: 'Failed to send test email',
        error: result.error,
      });
    }
  } catch (err) {
    next(err);
  }
};

/**
 * @desc Handle Contact Form Submission
 * @route POST /api/v1/email/contact
 * @access Public
 */
exports.handleContactSubmit = async (req, res, next) => {
  try {
    const { name, email, subject, message } = req.body;

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Please provide name, email, and message fields.',
      });
    }

    const result = await sendContactEmail({ name, email, subject: subject || 'General Inquiry', message });

    if (result.success) {
      return res.status(200).json({
        success: true,
        message: 'Your message has been submitted and a confirmation email has been sent.',
      });
    } else {
      // Even if background mail dispatch fails, respond gracefully with warning
      return res.status(200).json({
        success: true,
        message: 'Your message was received, but email notification delivery encountered an issue.',
        warning: result.error,
      });
    }
  } catch (err) {
    next(err);
  }
};
