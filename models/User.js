const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true,
      min: 3,
      match: /(\W|^)[\w.+\-]*@gmail\.com(\W|$)/,
    },
    password: {
      type: String,
      required: true,
    },
    fullname: {
      type: String,
      required: true,
      min: 5,
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
    role: {
      type: Number,
      default: 3,
      required: true,
      //type 1: admin, type: 2: own hotel, type 3: client
      enum: [1, 2, 3],
    },
  },
  {
    timestamps: true,
  }
);

userSchema.pre('save', function (next) {
  const user = this;
  if (!user.isModified('password')) return next();

  const salt = 10;
  bcrypt.hash(user.password, salt, (err, hash) => {
    if (err) return next(err);
    user.password = hash;
    next();
  });
});

userSchema.methods.comparePassword = function (password, cb) {
  bcrypt.compare(password, this.password, (err, isMatch) => {
    if (err) return cb(err);
    return cb(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

module.exports = User;
