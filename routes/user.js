const express = require('express');
const router = express.Router();

const controller = require('../controllers/user.controller');
const validator = require('../middlewares/validators/user.validator');
const authMiddleware = require('../middlewares/auth.middleware');

router.get(
  '/getAllUser',
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  controller.getAllUser
);

router.post(
  '/updateRoleUser',
  authMiddleware.requireAuth,
  authMiddleware.isAdmin,
  validator.updateRoleUser,
  controller.updateRoleUser
);

module.exports = router;
