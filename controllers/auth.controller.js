const jwt = require('jsonwebtoken');
const status = require('http-status');
const shortId = require('shortid');

const mail = require('../helpers/mail');
const User = require('../models/User');
const Verify = require('../models/Verify');

const authMessages = require('./../helpers/message/auth.message');

const mailVerify = (fullname, email, code) => {
  return mail.sendMail(
    email,
    'Please verify your account before login',
    `
    <h1>Hello ${fullname}</h1>
    <p>Please copy ${code} to verify your account.</p>
  `
  );
};

module.exports.login = async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res
      .status(status.NOT_FOUND)
      .json({ message: authMessages.EMAIL_NOT_EXIST });
  }

  const verify = await Verify.findOne({ user: user.id });

  if (!verify.isVerify) {
    return res.status(status.BAD_REQUEST).json({
      message: authMessages.EMAIL_NOT_VERIFIED,
    });
  }

  user.comparePassword(password, async (err, isMatch) => {
    if (!isMatch) {
      return res.status(status.UNAUTHORIZED).json({
        message: authMessages.LOGIN_FAIL,
      });
    }

    const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, {
      expiresIn: '24h',
    });

    return res.json({ ...user._doc, token });
  });
};

module.exports.register = async (req, res) => {
  const {
    email,
    password,
    fullname,
    city,
    district,
    ward,
    street,
    phone,
  } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists !== null) {
    return res.status(status.BAD_REQUEST).json({
      message: authMessages.EMAIL_EXIST,
    });
  }

  try {
    const user = await User.create({
      email,
      password,
      fullname,
      city,
      district,
      ward,
      street,
      phone,
    });

    const verify = await Verify.create({
      code: shortId.generate(),
      user: user.id,
    });

    mailVerify(fullname, email, verify.code);

    return res.json({ message: authMessages.REGISTER_SUCCESS });
  } catch (err) {
    return res.status(status.BAD_REQUEST).json({
      message: err.message,
    });
  }
};

module.exports.verify = async (req, res) => {
  const { email, code } = req.body;

  const user = await User.findOne({ email });
  const verify = await Verify.findOne({ user: user.id, code });
  if (!verify) {
    return res.status(status.BAD_REQUEST).json({
      message: authMessages.VERIFY_FAIL,
    });
  }

  if (verify.isVerify) {
    return res.status(status.BAD_REQUEST).json({
      message: authMessages.EMAIL_VERIFIED,
    });
  }

  await Verify.findOneAndUpdate(
    { user: user.id, code },
    {
      isVerify: true,
    }
  );

  return res.json({ message: authMessages.VERIFY_SUCCESS });
};

module.exports.resendMailVerify = async (req, res) => {
  const { email } = req.body;

  const user = await User.findOne({ email });
  if (!user) {
    return res.status(status.BAD_REQUEST).json({
      message: authMessages.EMAIL_NOT_EXIST,
    });
  }

  const verify = await Verify.findOne({ user: user.id });
  if (verify.isVerify) {
    return res.status(status.BAD_REQUEST).json({
      message: authMessages.EMAIL_VERIFIED,
    });
  }

  const newVerify = await Verify.findOneAndUpdate(
    { user: user.id },
    {
      code: shortId.generate(),
      user: user.id,
    }
  );
  mailVerify(user.fullname, email, newVerify.code);
  return res.json({ message: authMessages.RESEND_CODE_SUCCESS });
};

module.exports.logout = (req, res) => {
  return res.json({ message: 'Logout successfully.' });
};
