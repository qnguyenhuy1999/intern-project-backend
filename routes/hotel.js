const express = require('express');
const router = express.Router();

const controller = require('../controllers/hotel.controller');
const validator = require('../middlewares/validators/hotel.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/create',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  validator.createHotel,
  controller.createHotel
);
router.post('/filter', validator.filter, controller.filter);

module.exports = router;
