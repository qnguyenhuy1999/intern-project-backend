const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const status = require('http-status');

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
