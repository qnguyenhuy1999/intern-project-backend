const express = require('express');
const router = express.Router();

const controller = require('../controllers/transaction.controller');
const validator = require('../middlewares/validators/transaction.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/booking',
  authMiddleware.requireAuth,
  validator.booking,
  controller.booking
);

router.get('/user', authMiddleware.requireAuth, controller.getHistoryOfUser);

router.post(
  '/check-in/:transactionId',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  validator.checkIn,
  controller.checkIn
);

router.get(
  '/check-out/:transactionId',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  controller.checkOut
);

router.get(
  '/hotel/:hotelId',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  controller.getHistoryOfHotel
);
module.exports = router;
