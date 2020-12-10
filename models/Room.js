const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  hotel: {
    type: mongoose.Types.ObjectId,
    ref: 'Hotel',
  },
  equipments: [
    {
      type: mongoose.Types.ObjectId,
      ref: 'Equipment',
    },
  ],
  // widthxheight
  area: {
    type: String,
    required: true,
  },
  views: {
    type: Number,
    default: 0,
  },
  //number of room
  quantity: {
    type: Number,
    required: true,
    default: 1,
  },
  people: {
    type: Number,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  images: [
    {
      type: String,
      required: true,
    },
  ],
  isDeleted: {
    type: Boolean,
    required: true,
    default: false,
  },
});

module.exports = mongoose.model('Room', roomSchema);
