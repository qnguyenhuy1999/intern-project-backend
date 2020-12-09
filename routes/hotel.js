const express = require('express');
const router = express.Router();

const cloudinary = require('../helpers/upload_file');
const controller = require('../controllers/hotel.controller');
const validator = require('../middlewares/validators/hotel.validator');
const authMiddleware = require('../middlewares/auth.middleware');
const upload = cloudinary('hotel', 'avatar');

router.get(
  '/',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  controller.getHotel
);

// user search then view profile hotel
router.get('/:hotelId', controller.getHotelByID);

router.post(
  '/create',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  upload.middlewareUploadSingleFile,
  validator.createHotel,
  controller.createHotel
);

router.put(
  '/edit',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  validator.editHotel,
  controller.editHotel
);

router.post('/filter', validator.filter, controller.filter);

router.delete(
  '/delete',
  authMiddleware.requireAuth,
  authMiddleware.isOwnHotel,
  validator.deleteHotel,
  controller.deleteHotel
);

module.exports = router;
