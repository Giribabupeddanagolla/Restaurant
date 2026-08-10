const express = require('express');
const router = express.Router();
const {
  getShops,
  getShopById,
  createShop,
  updateShop,
  deleteShop,
} = require('../controllers/shopController');

router.route('/')
  .get(getShops)
  .post(createShop);

router.route('/:id')
  .get(getShopById)
  .put(updateShop)
  .delete(deleteShop);

module.exports = router;
