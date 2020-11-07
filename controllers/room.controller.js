const status = require('http-status');

const Room = require('../models/Room');

module.exports.createRoom = async (req, res) => {
  const { name, hotel, equipments, area, quantity, people, price } = req.body;

  try {
    const roomId = await Room.create({
      name,
      hotel,
      equipments,
      area,
      quantity,
      people,
      price,
    });

    const room = await Room.findById(roomId)
      .populate('hotel')
      .populate('equipments');

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
