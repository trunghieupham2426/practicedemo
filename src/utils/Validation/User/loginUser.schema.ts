import Joi from 'joi';

export const loginValidateSchema = Joi.object({
  password: Joi.string().required().empty(),
  email: Joi.string().required().empty(),
});
