const httpStatus = require('http-status');

const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const User = require('../models/User');

module.exports.createHotel = async (req, res) => {
  const {
    name,
    description,
    avatar,
    star,
    city,
    district,
    ward,
    street,
    phone,
    status,
  } = req.body;

  try {
    const hotelId = await Hotel.create({
      name,
      description,
      avatar,
      star,
      city,
      district,
      ward,
      street,
      phone,
      status,
      owner: req.userId,
    });

    const hotel = await Hotel.findById(hotelId.id).populate(
      'owner',
      'fullname email -_id'
    );
    return res.json({ hotel });
  } catch (err) {
    return res.status(httpStatus.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.filter = async (req, res) => {
  //1 room 2 people
  const { city, number_of_rooms, number_of_guest } = req.body;

  //if empty rooms, it can be out of room or room not enough contain number of guests
  const hotels = await Hotel.find({ city }).populate({
    path: 'rooms',
    match: {
      quantity: { $gte: number_of_rooms },
      people: { $gte: number_of_guest },
    },
  });

  return res.json({ hotels });
};
