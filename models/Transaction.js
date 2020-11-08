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
    phone: Number,
    fullname: String,
    checkin_date: Date,
    checkout_date: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Transaction', transactionSchema);
