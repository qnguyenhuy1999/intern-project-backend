const Joi = require('@hapi/joi');
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
    //should move it
    avatar: Joi.string().required(),
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
    city: Joi.string().required().insensitive(),
    number_of_rooms: Joi.number().required(),
    number_of_guest: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
