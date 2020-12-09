const status = require('http-status');

const User = require('../models/User');
const Transaction = require('../models/Transaction');

module.exports.changePassword = async (req, res) => {
  const { password, newPassword } = req.body;
  const { userId } = req;
  const user = await User.findById(userId);
  if (!user) {
    return res.status(status.NOT_FOUND).json({
      message: 'User not found',
    });
  }

  user.comparePassword(password, async (err, isMatch) => {
    if (!isMatch) {
      return res.status(status.BAD_REQUEST).json({
        message:
          'Sorry, your password is incorrect. Please check your password.',
      });
    }
    user.password = newPassword;
    user.save();
    return res.json(user);
  });
};

module.exports.updateProfile = async (req, res) => {
  const { userId } = req;
  const { fullname, city, district, ward, street, phone } = req.body;
  try {
    await User.findByIdAndUpdate(userId, {
      fullname,
      city,
      district,
      ward,
      street,
      phone,
    });
    const user = await User.findById(userId);
    return res.json({ user });
  } catch (err) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

module.exports.getAllUser = async (req, res) => {
  try {
    const users = await User.find({});
    return res.json({ users });
  } catch (err) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

module.exports.updateRoleUser = async (req, res) => {
  const { role, userId } = req.body;

  try {
    await User.findByIdAndUpdate(userId, {
      role,
    });
    const user = await User.findById(userId);
    return res.json({ user });
  } catch (err) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};

// do after
module.exports.getTransactionForOwnerHotel = async (req, res) => {};

module.exports.getTransactionForUser = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.userId });

    return res.json({ transactions });
  } catch (err) {
    return res
      .status(status.INTERNAL_SERVER_ERROR)
      .json({ message: err.message });
  }
};
