const status = require('http-status');

const Equipment = require('../models/Equipment');

module.exports.getEquipment = async (req, res) => {
  const equipments = await Equipment.find({});
  return res.json({ equipments });
};

module.exports.createEquipment = async (req, res) => {
  const { name, icon } = req.body;

  try {
    const equipment = await Equipment.create({
      name,
      icon,
    });

    return res.json({ equipment });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
