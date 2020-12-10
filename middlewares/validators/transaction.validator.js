const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const status = require('http-status');

module.exports.booking = (req, res, next) => {
  const schema = Joi.object({
    room: Joi.objectId().required(),
    phone: Joi.number().required(),
    fullname: Joi.string().required(),
    checkin_date: Joi.date().required(),
    checkout_date: Joi.date().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
