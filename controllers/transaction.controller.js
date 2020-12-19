const status = require('http-status');
const shortid = require('shortid');
const Hotel = require('../models/Hotel');
const Room = require('../models/Room');
const Transaction = require('../models/Transaction');
const mongoose = require('mongoose');

shortid.characters(
  '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ$@'
);

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

  let code = '';
  while (true) {
    code = shortid.generate();
    let existTransaction = await Transaction.find({ code });
    if (existTransaction.length === 0) break;
  }

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
      code,
    });

    const transaction = await Transaction.findById(transactionId.id)
      .populate({
        path: 'room',
        select: 'equipments name hotel area  people price',
        populate: [
          {
            path: 'hotel',
            select:
              'name description avatar star city district ward street phone',
          },
          {
            path: 'equipments',
          },
        ],
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
    const transactions = await Transaction.find({ user: userId })
      .populate({
        path: 'room',
        select: 'equipments name hotel area people price',
        populate: [
          {
            path: 'hotel',
            select:
              'name description avatar star city district ward street phone',
          },
          {
            path: 'equipments',
          },
        ],
      })
      .populate('user', 'email city district ward street');

    return res.json({ transactions });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.getHistoryOfHotel = async (req, res) => {
  const { userId } = req;
  const { hotelId } = req.params;

  try {
    const transactions = await Room.aggregate([
      {
        $match: {
          hotel: mongoose.Types.ObjectId(hotelId),
        },
      },
      {
        $sort: {
          createdAt: -1,
        },
      },
      {
        $lookup: {
          from: 'transactions',
          localField: '_id',
          foreignField: 'room',
          as: 'transactions',
        },
      },
      {
        $project: {
          transactions: 1,
        },
      },
    ]);
    let data = [];
    transactions.forEach((i) => {
      i.transactions.forEach((item) => {
        data.push(item);
      });
    });
    return res.json({ transactions: data });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.receiveRoom = async (req, res) => {
  const { transactionId } = req.params;
  try {
    isUpdated = await Transaction.findByIdAndUpdate(transactionId, {
      status: 1,
    });
    if (!isUpdated) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: 'Transaction not found' });
    }

    const transaction = await Transaction.findById(transactionId);
    return res.json({ transaction });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.checkIn = async (req, res) => {
  const { transactionId } = req.params;
  const { code } = req.body;
  try {
    let transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: 'Transaction not found' });
    }
    if (code !== transaction.code)
      return res
        .status(status.BAD_REQUEST)
        .json({ message: 'Mã xác nhận không đúng' });

    await Transaction.findByIdAndUpdate(transactionId, {
      status: 1,
    });

    transaction = await Transaction.findById(transactionId);
    return res.json({ transaction });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};

module.exports.checkOut = async (req, res) => {
  const { transactionId } = req.params;
  try {
    isUpdated = await Transaction.findByIdAndUpdate(transactionId, {
      status: 2,
    });
    if (!isUpdated) {
      return res
        .status(status.NOT_FOUND)
        .json({ message: 'Transaction not found' });
    }

    const transaction = await Transaction.findById(transactionId);
    return res.json({ transaction });
  } catch (err) {
    return res.status(status.INTERNAL_SERVER_ERROR).json({
      message: err.message,
    });
  }
};
