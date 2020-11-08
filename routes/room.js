const express = require('express');
const router = express.Router();

const controller = require('../controllers/room.controller');
const validator = require('../middlewares/validators/room.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/create',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  validator.createRoom,
  controller.createRoom
);

router.put(
  '/edit',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  validator.editRoom,
  controller.editRoom
);

router.post(
  '/booking',
  authMiddleware.requireAuth,
  validator.booking,
  controller.booking
);

module.exports = router;
