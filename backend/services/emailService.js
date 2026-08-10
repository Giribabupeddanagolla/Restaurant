const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST || 'smtp.gmail.com',
    port: Number(process.env.SMTP_PORT) || 587,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  });

  const message = {
    from: `${process.env.FROM_NAME || 'Giri Restaurant'} <${process.env.SMTP_USER}>`,
    to: options.email,
    subject: options.subject,
    text: options.message,
    html: options.html,
  };

  if (process.env.NODE_ENV !== 'production') {
    console.log(`[Dev Email Dispatch] To: ${options.email} | Subject: ${options.subject}`);
    return true;
  }

  await transporter.sendMail(message);
};

module.exports = sendEmail;
