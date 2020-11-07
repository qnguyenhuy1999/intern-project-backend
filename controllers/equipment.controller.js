const status = require('http-status');

const Equipment = require('../models/Equipment');

module.exports.createEquipment = async (req, res) => {
  const { name, icon } = req.body;

  try {
    const equiment = await Equipment.create({
      name,
      icon,
    });

    return res.json({ equiment });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
