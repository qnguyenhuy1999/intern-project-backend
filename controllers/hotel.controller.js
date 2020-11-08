const httpStatus = require('http-status');

const Hotel = require('../models/Hotel');

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

module.exports.editHotel = async (req, res) => {
  const {
    id,
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

  const hotelExist = await Hotel.findById(id);

  if (!hotelExist) {
    return res
      .status(status.BAD_REQUEST)
      .json({ message: 'The hotel is not existing.' });
  }

  try {
    await Hotel.findByIdAndUpdate(id, {
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
    });

    const hotel = await Hotel.findById(id, '-rooms').populate(
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
  const hotels = await Hotel.find({ $and: [{ city }, { status: 'available' }] })
    .populate({
      path: 'rooms',
      match: {
        quantity: { $gte: number_of_rooms },
        people: { $gte: number_of_guest },
      },
      select: 'views quantity images name hotel area people price',
      populate: {
        path: 'equipments',
        select: 'name icon -_id',
      },
    })
    .populate('owner', 'email fullname phone -_id');

  return res.json({ hotels });
};
