const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');

const transactionSchema = new mongoose.Schema(
  {
    room: {
      type: mongoose.Types.ObjectId,
      ref: 'Room',
      required: true,
    },
    user: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    phone: String,
    fullname: String,
    checkin_date: Date,
    checkout_date: Date,
    amount: Number,
    status: {
      type: Number,
      default: 0,
    }, // 0: chua nhan phong, 1: dang nhan, 2: da tra phong
    totalPrice: Number,
    code: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
