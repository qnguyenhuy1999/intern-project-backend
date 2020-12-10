const express = require('express');
const router = express.Router();

const cloudinary = require('../helpers/upload_file');
const controller = require('../controllers/room.controller');
const validator = require('../middlewares/validators/room.validator');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = cloudinary('room', 'media');

router.get(
  '/:hotelId',
  // authMiddleware.requireAuth,
  // authMiddleware.isOwnHotel,
  controller.getRoom
);

router.post(
  '/create',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  upload.uploadMultipleFile,
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
  '/delete',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  validator.deleteRoom,
  controller.deleteRoom
);

router.get('/show/:roomId', controller.getRoomById);

module.exports = router;
