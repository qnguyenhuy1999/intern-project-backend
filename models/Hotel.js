const mongoose = require('mongoose');

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
    type: Number,
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
});

module.exports = mongoose.model('Hotel', hotelSchema);
