import express from 'express';
import {
  createUser,
  login,
  verifyEmail,
  forgotPassword,
  resetPassword,
  viewMyProfile,
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
import {
  adminProtectingRoute,
  protectingRoutes,
} from '../middleware/auth.middleware';
import { uploadUserAvatar } from '../middleware/multer.middleware';
import {
  blockUser,
  deleteUser,
  unBlockUser,
  viewAllUser,
  viewUserDetail,
} from '../controller/admin.controller';

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

// PROTECTING ROUTE user
router.get('/getMe', protectingRoutes, viewMyProfile);
router.patch(
  '/changeAvatar',
  protectingRoutes,
  uploadUserAvatar.single('avatar'),
  changeUserAvatar
);
router.patch(
  '/updateMe',
  protectingRoutes,
  JoiValidation(updateUserInfoSchema),
  updateUserInfo
);
router.patch(
  '/updateDeliveryAddress',
  protectingRoutes,
  JoiValidation(updateDeliveryAddressSchema),
  updateDeliveryAddress
);

//for admin
router.use(adminProtectingRoute);
router.get('/', viewAllUser);

router.patch('/block/:userId', blockUser);
router.patch('/unblock/:userId', unBlockUser);

router.route('/:userId').get(viewUserDetail).delete(deleteUser);
