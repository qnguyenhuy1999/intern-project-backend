const status = require('http-status');

const Hotel = require('../models/Hotel');
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
    await Hotel.findByIdAndUpdate(
      hotel,
      { $push: { rooms: roomId } },
      { new: true, upsert: true }
    );

    const room = await Room.findById(roomId)
      .populate('hotel', '-rooms')
      .populate('equipments');

    return res.json({ room });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
