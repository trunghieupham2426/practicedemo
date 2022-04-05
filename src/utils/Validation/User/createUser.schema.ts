import Joi from 'joi';
import createError from 'http-errors';

export const signUpValidateSchema = Joi.object({
  username: Joi.string()
    .alphanum()
    .min(2)
    .max(30)
    .required()
    .error((errors: any) => {
      errors.forEach((err: any) => {
        switch (err.code) {
          case 'string.empty':
            err.message = 'username should not be empty!';
            break;
          case 'string.min':
            err.message = `username should have at least ${err.local.limit} characters!`;
            break;
          case 'string.max':
            err.message = `username should have at most ${err.local.limit} characters!`;
            break;
          default:
            break;
        }
      });
      return errors;
    }),

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
