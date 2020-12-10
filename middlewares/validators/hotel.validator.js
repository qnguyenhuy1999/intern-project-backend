const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const status = require('http-status');

module.exports.createHotel = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required().insensitive(),
    description: Joi.string().required().insensitive(),
    star: Joi.number().max(10).required(),
    city: Joi.string().max(50).required().insensitive(),
    district: Joi.string().max(50).required().insensitive(),
    ward: Joi.string().max(50).required().insensitive(),
    street: Joi.string().max(100).required().insensitive(),
    phone: Joi.number().required(),
    status: Joi.string()
      .valid('closed', 'temporarily', 'available', 'out of room')
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.editHotel = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().max(50).required().insensitive(),
    description: Joi.string().required().insensitive(),
    star: Joi.number().max(10).required(),
    city: Joi.string().max(50).required().insensitive(),
    district: Joi.string().max(50).required().insensitive(),
    ward: Joi.string().max(50).required().insensitive(),
    street: Joi.string().max(100).required().insensitive(),
    phone: Joi.number().required(),
    status: Joi.string()
      .valid('closed', 'temporarily', 'available', 'out of room')
      .required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.filter = (req, res, next) => {
  const schema = Joi.object({
    keyword: Joi.string().required().allow(''),
    room: Joi.number().required(),
    people: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.deleteHotel = (req, res, next) => {
  const schema = Joi.object({
    hotelId: Joi.objectId().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
