const Joi = require('@hapi/joi');
const status = require('http-status');

module.exports.createEquipment = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required(),
    icon: Joi.string().max(50).required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
