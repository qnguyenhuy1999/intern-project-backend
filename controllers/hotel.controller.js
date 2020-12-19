const httpStatus = require('http-status');

const User = require('../models/User');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');

module.exports.getHotel = async (req, res) => {
  try {
    const user = await User.findById(req.userId);

    const hotels = await Hotel.find(
      user.role === 1 ? {} : { owner: req.userId }
    ).populate('owner', 'fullname email -_id');

    return res.json({ hotels });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

module.exports.createHotel = async (req, res) => {
  const {
    name,
    description,
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
      star,
      city,
      district,
      ward,
      street,
      phone,
      status,
      avatar: req.file.path,
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
  const { keyword, room, people } = req.body;
  //if empty rooms, it can be out of room or room not enough contain number of guests
  const hotels = await Hotel.find({
    $and: [
      {
        $or: [
          {
            city: { $regex: `.*${keyword}.*`, $options: 'i' },
          },
          {
            name: { $regex: `.*${keyword}.*`, $options: 'i' },
          },
        ],
      },
      { status: 'available' },
    ],
  })
    .populate({
      path: 'rooms',
      match: {
        quantity: { $gte: room },
        people: { $gte: people },
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

module.exports.deleteHotel = async (req, res) => {
  const { hotelId } = req.body;

  try {
    await Hotel.findByIdAndDelete(hotelId);

    await Room.deleteMany({ hotel: { $in: hotelId } });

    return res.json({ id: hotelId });
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

module.exports.getHotelByID = async (req, res) => {
  const { hotelId } = req.params;
  try {
    const hotel = await Hotel.findById(hotelId);
    return res.json(hotel);
  } catch (err) {
    return res
      .status(httpStatus.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
