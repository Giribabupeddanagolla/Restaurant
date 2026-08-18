const express = require('express');
const router = express.Router();
const {
  verifyEmailSetup,
  sendTestEmail,
  handleContactSubmit,
} = require('../controllers/emailController');

router.get('/verify', verifyEmailSetup);
router.post('/send-test', sendTestEmail);
router.post('/contact', handleContactSubmit);

module.exports = router;
