const express = require('express');
const router = express.Router();

const controller = require('../controllers/location.controller');
router.get('/city', controller.getCity);
router.get('/city/:id/district', controller.getDistrict);
router.get('/district/:id/ward', controller.getWard);

module.exports = router;
