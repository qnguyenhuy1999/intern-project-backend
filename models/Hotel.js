const { boolean } = require('@hapi/joi');
const mongoose = require('mongoose');
const { booking } = require('../controllers/transaction.controller');

//avatar: 450x450, listImageDescription: 1200x800
const hotelSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    min: 3,
  },
  avatar: {
    type: String,
    required: true,
  },
  star: {
    type: Number,
    required: true,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
  ward: {
    type: String,
    required: true,
  },
  street: {
    type: String,
    required: true,
  },
  phone: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
    enum: ['closed', 'temporarily', 'available', 'out of room'],
  },
  owner: {
    type: mongoose.Types.ObjectId,
    ref: 'User',
  },
  rooms: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Room',
    },
  ],
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Hotel', hotelSchema);
