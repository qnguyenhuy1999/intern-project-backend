const status = require('http-status');

const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');

module.exports.booking = async (req, res) => {
  const {
    room,
    phone,
    fullname,
    checkin_date,
    checkout_date,
    amount,
    totalPrice,
  } = req.body;

  const checkRoom = await Room.findById(room);
  if (!checkRoom)
    return res
      .status(status.BAD_REQUEST)
      .json({ message: 'Room does not exist' });

  try {
    const transactionId = await Transaction.create({
      room,
      user: req.userId,
      phone,
      fullname,
      checkin_date,
      checkout_date,
      amount,
      totalPrice,
    });

    const transaction = await Transaction.findById(transactionId.id)
      .populate({
        path: 'room',
        select: 'equipments name hotel area  people price',
        populate: {
          path: 'hotel',
          select:
            'name description avatar star city district ward street phone',
        },
        populate: {
          path: 'equipments',
        },
      })
      .populate('user', 'email city district ward street');

    return res.json({ transaction });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.getHistoryOfUser = async (req, res) => {
  const { userId } = req;
  try {
    const transaction = await Transaction.find({ user: userId })
      .populate({
        path: 'room',
        select: 'equipments name hotel area  people price',
        populate: {
          path: 'hotel',
          select:
            'name description avatar star city district ward street phone',
        },
        populate: {
          path: 'equipments',
        },
      })
      .populate('user', 'email city district ward street');

    return res.json({ transaction });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
  res.json(userId);
};
