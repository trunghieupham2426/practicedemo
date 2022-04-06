import express from 'express';
import {
  createUser,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  viewUserProfile,
  changeUserAvatar,
  updateUserInfo,
  updateDeliveryAddress,
} from '../controller/user.controller';
import { JoiValidation } from '../middleware/joi.middleware';
import {
  signUpValidateSchema,
  loginValidateSchema,
  forgotPasswordSchema,
  resetPasswordSchema,
  updateUserInfoSchema,
  updateDeliveryAddressSchema,
} from '../utils/Validation/User/userValidate.schema';
import { verifyEmailToken } from '../middleware/jwt.middleware';
import { protectingRoutes } from '../middleware/auth.middleware';
import { uploadImage } from '../middleware/multer.middleware';

export const router = express.Router();

router.post('/signup', JoiValidation(signUpValidateSchema), createUser);
router.post('/login', JoiValidation(loginValidateSchema), login);
router.post(
  '/forgotPassword',
  JoiValidation(forgotPasswordSchema),
  forgotPassword
);

router.patch(
  '/resetPassword/:token',
  JoiValidation(resetPasswordSchema),
  resetPassword
);
router.get('/verify/:token', verifyEmailToken, verifyEmail);

// PROTECTING ROUTE
router.use(protectingRoutes);

router.get('/getMe', viewUserProfile);
router.patch('/changeAvatar', uploadImage.single('avatar'), changeUserAvatar);
router.patch('/updateMe', JoiValidation(updateUserInfoSchema), updateUserInfo);
router.patch(
  '/updateDeliveryAddress',
  JoiValidation(updateDeliveryAddressSchema),
  updateDeliveryAddress
);
