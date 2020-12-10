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
module.exports = router;
