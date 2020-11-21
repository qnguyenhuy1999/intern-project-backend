const express = require('express');
const router = express.Router();

const controller = require('../controllers/equipment.controller');
const validator = require('../middlewares/validators/equipment.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.post(
  '/create',
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  validator.createEquipment,
  controller.createEquipment
);

router.get('/', controller.getEquipment);

module.exports = router;
