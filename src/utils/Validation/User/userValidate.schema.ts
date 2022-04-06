import Joi from 'joi';
import createError from 'http-errors';

//create user schema
export const signUpValidateSchema = Joi.object({
  username: Joi.string().alphanum().min(2).max(30).required(),
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required()
    .error(
      //@ts-ignore
      new createError(
        400,
        'invalid password , must contain at least 6 characters'
      )
    ),
  email: Joi.string()
    .email({
      minDomainSegments: 2,
      tlds: { allow: ['com', 'net'] },
    })
    .required(),
});

//login user schema
export const loginValidateSchema = Joi.object({
  password: Joi.string().required().empty(),
  email: Joi.string().required().empty(),
});

// forgot password schema
export const forgotPasswordSchema = Joi.object({
  email: Joi.string().required().empty(),
});

//reset password schema
export const resetPasswordSchema = Joi.object({
  password: Joi.string()
    .regex(/^[a-zA-Z0-9]{6,30}$/)
    .required()
    .error(
      //@ts-ignore
      new createError(
        400,
        'invalid password , must contain at least 6 characters'
      )
    ),
});

//update user info schema
export const updateUserInfoSchema = Joi.object({
  fullname: Joi.string().empty(),
  phone: Joi.string().empty(),
  birthday: Joi.date().empty().error(
    //@ts-ignore
    new createError(400, 'invalid , use this format MM-DD-YYYY')
  ),
  gender: Joi.string().valid('male', 'female').empty(),
});

//update user delivery address schema
export const updateDeliveryAddressSchema = Joi.object({
  address: Joi.string().empty(),
  city: Joi.string().empty(),
  country: Joi.string().empty(),
  phone: Joi.string().empty(),
});
