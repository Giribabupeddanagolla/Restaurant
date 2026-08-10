const express = require('express');
const router = express.Router();
const { getTables, updateTableStatus } = require('../controllers/tableController');

router.get('/', getTables);
router.put('/:id/status', updateTableStatus);

module.exports = router;
