const Joi = require('@hapi/joi');
const status = require('http-status');

module.exports.login = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(new RegExp(/(\W|^)[\w.+\-]*@gmail\.com(\W|$)/))
      .insensitive(),

    password: Joi.string().required().insensitive(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.register = (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(new RegExp(/(\W|^)[\w.+\-]*@gmail\.com(\W|$)/))
      .insensitive(),
    password: Joi.string().required().insensitive(),
    city: Joi.string().required().insensitive(),
    district: Joi.string().required().insensitive(),
    ward: Joi.string().required().insensitive(),
    street: Joi.string().required().insensitive(),
    phone: Joi.number().required(),
    fullname: Joi.string().required().min(5),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.resendMailVerify = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(new RegExp(/(\W|^)[\w.+\-]*@gmail\.com(\W|$)/))
      .insensitive(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.verify = async (req, res, next) => {
  const schema = Joi.object({
    email: Joi.string()
      .required()
      .pattern(new RegExp(/(\W|^)[\w.+\-]*@gmail\.com(\W|$)/))
      .insensitive(),
    code: Joi.string().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
