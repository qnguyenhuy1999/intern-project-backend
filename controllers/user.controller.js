const status = require('http-status');

const User = require('../models/User');
const Transaction = require('../models/Transaction');

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
