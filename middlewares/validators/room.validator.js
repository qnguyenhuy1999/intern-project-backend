const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const status = require('http-status');

module.exports.createRoom = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    hotel: Joi.objectId().required(),
    equipments: Joi.array().items(Joi.objectId()).single(),
    area: Joi.number().required(),
    quantity: Joi.number().required(),
    people: Joi.number().required(),
    price: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.editRoom = (req, res, next) => {
  const schema = Joi.object({
    id: Joi.objectId().required(),
    name: Joi.string().max(50).required(),
    hotel: Joi.objectId().required(),
    equipments: Joi.array().items(Joi.objectId()).single(),
    area: Joi.number().required(),
    quantity: Joi.number().required(),
    people: Joi.number().required(),
    price: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

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
