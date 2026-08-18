const nodemailer = require('nodemailer');

// Cached Ethereal transporter for fallback
let cachedEtherealTransporter = null;

/**
 * Create Primary Gmail / Standard SMTP Transporter
 */
const createPrimaryTransporter = () => {
  const user = process.env.EMAIL_USER || process.env.SMTP_USER;
  const pass = process.env.EMAIL_PASSWORD || process.env.SMTP_PASS;
  const host = process.env.SMTP_HOST || 'smtp.gmail.com';
  const port = Number(process.env.SMTP_PORT) || 587;

  if (host.includes('gmail')) {
    return nodemailer.createTransport({
      service: 'gmail',
      auth: { user, pass },
    });
  }

  return nodemailer.createTransport({
    host,
    port,
    secure: port === 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: false },
  });
};

/**
 * Get or Create Ethereal Test Transporter (Fallback)
 */
const getEtherealTransporter = async () => {
  if (cachedEtherealTransporter) return cachedEtherealTransporter;
  const testAccount = await nodemailer.createTestAccount();
  console.log(`💡 [Ethereal Fallback Account Created] User: ${testAccount.user}`);
  cachedEtherealTransporter = nodemailer.createTransport({
    host: 'smtp.ethereal.email',
    port: 587,
    secure: false,
    auth: {
      user: testAccount.user,
      pass: testAccount.pass,
    },
  });
  return cachedEtherealTransporter;
};

/**
 * Verify Transporter Connection
 */
const verifyTransporter = async () => {
  try {
    const transporter = createPrimaryTransporter();
    await transporter.verify();
    return { success: true, message: 'Nodemailer Gmail/SMTP Transporter connected successfully!' };
  } catch (error) {
    const isAppPasswordRequired = error.message.includes('534') || error.message.includes('Application-specific password required');
    console.error('⚠️ Primary Transporter Verification Notice:', error.message);
    
    return {
      success: false,
      isAppPasswordRequired,
      error: error.message,
      recommendation: isAppPasswordRequired
        ? 'Google account has 2-Step Verification enabled. Please generate a 16-character App Password at https://myaccount.google.com/apppasswords and set EMAIL_PASSWORD in .env.'
        : 'Check SMTP host, port, and credentials in backend/.env',
    };
  }
};

/**
 * Send Generic Email with Automatic Ethereal Fallback
 */
const sendEmail = async ({ email, subject, message, text, html }) => {
  const fromName = process.env.FROM_NAME || 'Giri Restaurant';
  const senderEmail = process.env.EMAIL_USER || process.env.SMTP_USER || 'noreply@girirestaurant.com';

  const mailOptions = {
    from: `"${fromName}" <${senderEmail}>`,
    to: email,
    subject: subject,
    text: text || message,
    html: html || `<p>${message || text}</p>`,
  };

  // Attempt 1: Primary Transporter (Gmail / Custom SMTP)
  try {
    const primaryTransporter = createPrimaryTransporter();
    const info = await primaryTransporter.sendMail(mailOptions);
    console.log(`✉️ Email dispatched via Primary SMTP to ${email} (MessageID: ${info.messageId})`);
    return { success: true, messageId: info.messageId, provider: 'primary' };
  } catch (primaryError) {
    console.warn(`⚠️ Primary Email Dispatch to ${email} failed: ${primaryError.message}`);
    console.warn(`🔄 Attempting automatic Ethereal preview fallback...`);

    // Attempt 2: Fallback to Ethereal Test Account
    try {
      const etherealTransporter = await getEtherealTransporter();
      const info = await etherealTransporter.sendMail(mailOptions);
      const previewUrl = nodemailer.getTestMessageUrl(info);
      console.log(`📧 [Ethereal Live Preview Available]: ${previewUrl}`);
      
      return {
        success: true,
        messageId: info.messageId,
        provider: 'ethereal_fallback',
        previewUrl,
        warning: primaryError.message,
        note: 'Email was captured via Ethereal test inbox. Set a 16-character Google App Password in .env to deliver directly to real Gmail inboxes.',
      };
    } catch (fallbackError) {
      console.error(`❌ Both Primary and Fallback Email Dispatch failed:`, fallbackError.message);
      return { success: false, error: primaryError.message || fallbackError.message };
    }
  }
};

/**
 * Login Notification Email Template
 */
const sendLoginAlertEmail = async ({ email, name, role, ipAddress, userAgent }) => {
  const loginTime = new Date().toLocaleString('en-IN', { timeZone: 'Asia/Kolkata' });
  const subject = `🔐 Security Alert: Successful Login to Giri Restaurant`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #FDFAF7;">
      <h2 style="color: #8B0000; text-align: center;">Account Login Notification</h2>
      <p>Hello <strong>${name || email}</strong>,</p>
      <p>We detected a successful login to your <strong>Giri Restaurant</strong> account.</p>
      <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>User Name:</strong> ${name || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>User Email:</strong> ${email}</p>
        <p style="margin: 5px 0;"><strong>Role:</strong> ${role || 'User'}</p>
        <p style="margin: 5px 0;"><strong>Login Time:</strong> ${loginTime} (IST)</p>
        ${ipAddress ? `<p style="margin: 5px 0;"><strong>IP Address:</strong> ${ipAddress}</p>` : ''}
      </div>
      <p style="color: #777; font-size: 13px;">If this was you, no action is needed. If you did not log in, please secure your account immediately.</p>
      <p style="font-size: 12px; color: #777; text-align: center;">Giri Restaurant Security System</p>
    </div>
  `;

  // 1. Send security alert to the logged-in user's email
  const userSendResult = await sendEmail({ email, subject, text: `Login notification for ${name} (${email}) at ${loginTime}`, html });

  // 2. Also send alert copy to the admin email
  const adminEmail = process.env.EMAIL_USER || process.env.SMTP_USER;
  if (adminEmail && adminEmail !== email) {
    const adminAlertSubject = `[Login Alert] ${name || email} (${role || 'User'}) Logged In`;
    sendEmail({
      email: adminEmail,
      subject: adminAlertSubject,
      text: `User ${name} (${email}, Role: ${role}) logged in at ${loginTime}`,
      html: `
        <div style="font-family: Arial, sans-serif; padding: 15px; border: 1px solid #ddd; border-radius: 8px;">
          <h3 style="color: #8B0000;">User Login Notification</h3>
          <p><strong>Name:</strong> ${name || 'N/A'}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Role:</strong> ${role || 'User'}</p>
          <p><strong>Time:</strong> ${loginTime} (IST)</p>
        </div>
      `,
    }).catch(err => console.error('Admin login copy error:', err.message));
  }

  return userSendResult;
};

/**
 * Welcome Email Template
 */
const sendWelcomeEmail = async ({ email, name }) => {
  const subject = 'Welcome to Giri Restaurant! 🍽️';
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #FDFAF7;">
      <h2 style="color: #8B0000; text-align: center;">Welcome to Giri Restaurant</h2>
      <p>Hello <strong>${name || 'Valued Guest'}</strong>,</p>
      <p>Thank you for joining Giri Restaurant! We are delighted to have you as part of our culinary community.</p>
      <p>Explore our menu, reserve a table, or place an order online anytime.</p>
      <div style="text-align: center; margin: 30px 0;">
        <a href="${process.env.CLIENT_URL || 'http://localhost:3000'}" style="background-color: #8B0000; color: white; padding: 12px 24px; border-radius: 8px; text-decoration: none; font-weight: bold;">Explore Menu</a>
      </div>
      <p style="font-size: 12px; color: #777; text-align: center;">Warm regards,<br>Giri Restaurant Team</p>
    </div>
  `;
  return sendEmail({ email, subject, text: `Welcome to Giri Restaurant, ${name}!`, html });
};

/**
 * Reservation Email Template
 */
const sendReservationEmail = async ({ email, name, resId, date, time, guests, status = 'Confirmed' }) => {
  const subject = `Table Reservation ${status}: ${resId || 'Giri Restaurant'}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #FDFAF7;">
      <h2 style="color: #8B0000; text-align: center;">Reservation ${status}</h2>
      <p>Dear <strong>${name || 'Guest'}</strong>,</p>
      <p>Your table reservation at Giri Restaurant has been <strong>${status.toLowerCase()}</strong>.</p>
      <div style="background-color: #ffffff; padding: 15px; border-radius: 8px; border: 1px solid #e0e0e0; margin: 20px 0;">
        <p style="margin: 5px 0;"><strong>Reservation ID:</strong> ${resId || 'N/A'}</p>
        <p style="margin: 5px 0;"><strong>Date:</strong> ${date || 'Today'}</p>
        <p style="margin: 5px 0;"><strong>Time:</strong> ${time || 'Standard'}</p>
        <p style="margin: 5px 0;"><strong>Guests:</strong> ${guests || 2} Person(s)</p>
      </div>
      <p>We look forward to serving you a memorable dining experience!</p>
      <p style="font-size: 12px; color: #777; text-align: center;">Giri Restaurant | Culinary Excellence</p>
    </div>
  `;
  return sendEmail({ email, subject, text: `Reservation ${status} - ID: ${resId}`, html });
};

/**
 * Order Receipt Email Template
 */
const sendOrderReceiptEmail = async ({ email, name, orderNumber, items = [], totalAmount, status = 'Placed' }) => {
  const itemsListHtml = items.map(item => `
    <tr>
      <td style="padding: 8px; border-bottom: 1px solid #eee;">${item.name || item.title || 'Item'} (x${item.quantity || 1})</td>
      <td style="padding: 8px; border-bottom: 1px solid #eee; text-align: right;">₹${((item.price || 0) * (item.quantity || 1)).toFixed(2)}</td>
    </tr>
  `).join('');

  const subject = `Order Receipt #${orderNumber || 'Giri Restaurant'}`;
  const html = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #FDFAF7;">
      <h2 style="color: #8B0000; text-align: center;">Order Confirmation</h2>
      <p>Hi <strong>${name || 'Customer'}</strong>,</p>
      <p>Thank you for your order! Status: <strong>${status}</strong></p>
      <p><strong>Order #:</strong> ${orderNumber}</p>
      <table style="width: 100%; border-collapse: collapse; margin: 20px 0; background: #fff; border-radius: 8px;">
        <thead>
          <tr style="background: #8B0000; color: white;">
            <th style="padding: 8px; text-align: left;">Item</th>
            <th style="padding: 8px; text-align: right;">Price</th>
          </tr>
        </thead>
        <tbody>
          ${itemsListHtml || '<tr><td colspan="2" style="padding: 8px;">Order Details Received</td></tr>'}
        </tbody>
      </table>
      <h3 style="text-align: right; color: #8B0000;">Total: ₹${Number(totalAmount || 0).toFixed(2)}</h3>
      <p style="font-size: 12px; color: #777; text-align: center;">Thank you for dining with Giri Restaurant!</p>
    </div>
  `;
  return sendEmail({ email, subject, text: `Order ${orderNumber} confirmation for ₹${totalAmount}`, html });
};

/**
 * Contact Form Email Template (Admin Notification & User Acknowledgement)
 */
const sendContactEmail = async ({ name, email, subject, message }) => {
  const adminEmail = process.env.EMAIL_USER || process.env.SMTP_USER;
  
  // 1. Send notification to restaurant admin
  const adminSubject = `[Contact Inquiry] ${subject || 'General Enquiry'} from ${name}`;
  const adminHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #ffffff;">
      <h3 style="color: #8B0000;">New Customer Inquiry Received</h3>
      <p><strong>Sender Name:</strong> ${name}</p>
      <p><strong>Sender Email:</strong> <a href="mailto:${email}">${email}</a></p>
      <p><strong>Subject:</strong> ${subject}</p>
      <p><strong>Message:</strong></p>
      <blockquote style="background: #f9f9f9; border-left: 4px solid #8B0000; margin: 10px 0; padding: 10px;">
        ${message}
      </blockquote>
    </div>
  `;
  await sendEmail({ email: adminEmail, subject: adminSubject, text: message, html: adminHtml });

  // 2. Send acknowledgement to customer
  const userSubject = `We received your message: ${subject || 'Giri Restaurant'}`;
  const userHtml = `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px; background-color: #FDFAF7;">
      <h3 style="color: #8B0000; text-align: center;">Thank you for reaching out!</h3>
      <p>Dear <strong>${name}</strong>,</p>
      <p>We have received your message regarding "<strong>${subject}</strong>". Our support team will get back to you shortly.</p>
      <p style="font-size: 12px; color: #777; text-align: center;">Giri Restaurant Support Team</p>
    </div>
  `;
  return sendEmail({ email, subject: userSubject, text: `Thank you for contacting Giri Restaurant.`, html: userHtml });
};

module.exports = {
  sendEmail,
  sendWelcomeEmail,
  sendReservationEmail,
  sendOrderReceiptEmail,
  sendContactEmail,
  sendLoginAlertEmail,
  verifyTransporter,
};
