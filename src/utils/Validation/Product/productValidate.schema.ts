import Joi from 'joi';
import createError from 'http-errors';

export const createProductSchema = Joi.object({
  productName: Joi.string().empty().required(),
  desc: Joi.string().empty().required(),
  price: Joi.number().empty().required(),
  unitsInStock: Joi.number().empty().required(),
  categoryId: Joi.array().required(),
});
