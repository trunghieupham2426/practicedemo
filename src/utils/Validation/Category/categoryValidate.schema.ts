import Joi from 'joi';
import createError from 'http-errors';

export const createCategorySchema = Joi.object({
  categoryName: Joi.string().empty().required(),
  desc: Joi.string().empty().required(),
});

export const updateCategorySchema = Joi.object({
  categoryName: Joi.string().empty(),
  desc: Joi.string().empty(),
});
