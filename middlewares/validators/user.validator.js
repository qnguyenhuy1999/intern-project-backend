const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const status = require('http-status');

module.exports.changePassword = (req, res, next) => {
  const schema = Joi.object({
    password: Joi.string().required(),
    newPassword: Joi.string().required().min(6),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.updateProfile = (req, res, next) => {
  const schema = Joi.object({
    fullname: Joi.string().required().min(5),
    city: Joi.string().required(),
    district: Joi.string().required(),
    ward: Joi.string().required(),
    street: Joi.string().required(),
    phone: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.updateRoleUser = (req, res, next) => {
  const schema = Joi.object({
    userId: Joi.objectId().required(),
    role: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
