import Joi from 'joi';
import createError from 'http-errors';
import { productStatusEnum } from '../../../models/ProductCateGory/product.model';

export const createProductSchema = Joi.object({
  productName: Joi.string().empty().required(),
  desc: Joi.string().empty().required(),
  price: Joi.number().empty().required(),
  unitsInStock: Joi.number().empty().required(),
  categoryId: Joi.array().required(),
  productStatus: Joi.string()
    .empty()
    .valid(productStatusEnum.ACTIVE, productStatusEnum.INACTIVE),
});

export const updateProductSchema = Joi.object({
  productName: Joi.string().empty(),
  desc: Joi.string().empty(),
  thumpNail: Joi.string().empty(),
  price: Joi.number().empty(),
  unitsInStock: Joi.number().empty(),
  productStatus: Joi.string()
    .empty()
    .valid(productStatusEnum.ACTIVE, productStatusEnum.INACTIVE),
});
