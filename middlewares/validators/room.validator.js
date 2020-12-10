const Joi = require('@hapi/joi');
Joi.objectId = require('joi-objectid')(Joi);
const status = require('http-status');

module.exports.createRoom = (req, res, next) => {
  const schema = Joi.object({
    name: Joi.string().max(50).required().messages({
      'string.base':
        'Sorry! It looks like something went wrong. Please try later',
      // 'string.pattern.base': 'Phone number must be a 10 digits number',
      'string.empty': 'Tên loại phòng không được trống',
      // 'any.required': 'Phone Number is required',
      'string.max': 'Tên loại phòng tối đa 50 kí tự',
    }),
    hotel: Joi.objectId().required(),
    equipments: Joi.array().items(Joi.objectId()).single(),
    area: Joi.number().required(),
    quantity: Joi.number().required(),
    people: Joi.number().required(),
    price: Joi.number().required().messages({
      'number.empty': 'Giá phòng không được trống',
      'number.base': 'Giá phòng phải là một số',
    }),
    views: Joi.number().required(),
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
    views: Joi.number().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};

module.exports.deleteRoom = (req, res, next) => {
  const schema = Joi.object({
    roomId: Joi.objectId().required(),
  });

  const { error } = schema.validate(req.body);
  if (error) {
    return res.status(status.BAD_REQUEST).json({
      message: error.message,
    });
  }
  next();
};
