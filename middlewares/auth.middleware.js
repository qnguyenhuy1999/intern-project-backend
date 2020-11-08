const jwt = require('jsonwebtoken');
const status = require('http-status');
const User = require('../models/User');

module.exports.requireAuth = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token === null) {
    return res.status(status.FORBIDDEN).json({
      message: 'No token provided.',
    });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id;
    next();
  } catch (error) {
    return res.status(status.UNAUTHORIZED).json({
      message: 'Unauthorized: Invalid token',
    });
  }
};

module.exports.isAdmin = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (user.role !== 1) {
    next(
      res.status(status.FORBIDDEN).json({
        message: 'Email or password not correct.',
      })
    );
  }

  next();
};

module.exports.isOwnHotel = async (req, res, next) => {
  const user = await User.findById(req.userId);

  if (user.role !== 2 && user.role !== 1) {
    next(
      res.status(status.FORBIDDEN).json({
        message: 'Email or password not correct.',
      })
    );
  }

  next();
};
