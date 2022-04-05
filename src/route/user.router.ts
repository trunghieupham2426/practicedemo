import express from 'express';
import { createUser, login, verifyEmail } from '../controller/user.controller';
import { JoiValidation } from '../middleware/joi.middleware';
import { signUpValidateSchema } from '../utils/Validation/User/createUser.schema';
import { verifyEmailToken } from '../middleware/jwt.middleware';
import { loginValidateSchema } from '../utils/Validation/User/loginUser.schema';

export const router = express.Router();

router.post('/signup', JoiValidation(signUpValidateSchema), createUser);
router.post('/login', JoiValidation(loginValidateSchema), login);
router.get('/verify/:token', verifyEmailToken, verifyEmail);
