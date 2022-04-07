import { UserService } from '../service/UserService/user.service';
import { Request, Response, NextFunction } from 'express';
import { MailService } from '../utils/Nodemailer/nodemailer.util';
import { generateToken } from '../utils/Jwt/jwt.util';
import { UserDto } from '../service/UserService/dto/create-user.dto';
import { catchAsync } from '../utils/ErrorHandler/catchAsync';
import User from '../models/User/user.model';

const userService = new UserService();
const mailService = new MailService();

export const createUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const data: UserDto = { ...req.body };
    const user = await userService.createUser(data);
    //create verify token
    const token = generateToken(
      { email: data.email },
      process.env.JWT_VERIVYEMAILTIME
    );
    //send email to user
    await mailService.sendUserConfirmation(data.email, token);
    // send response
    res.status(200).json({
      status: true,
      message: 'check your email to verify account',
    });
  }
);

export const verifyEmail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //get email from res.local
    const email = res.locals.email;
    await userService.verifyUserEmail(email);
    //send response to user
    res.status(200).json({
      status: true,
    });
  }
);

export const login = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email, password } = req.body;
    const user = (await userService.loginUser(email, password)) as User;
    //clear the session
    //@ts-ignore
    req.session.userId = null;
    //check user is Admin , then set the session
    if (user.isAdmin) {
      //@ts-ignore
      req.session.userId = user.id;
    }
    //generate token
    const token = generateToken({ id: user.id }, process.env.JWT_EXPIRYTIME);
    res.status(200).json({
      status: true,
      token: token,
    });
  }
);

export const forgotPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { email } = req.body;
    //get randomToken
    const randomToken = (await userService.forgotPassword(email)) as string;
    //send email to user
    await mailService.sendUserForgotPassword(email, randomToken);
    res.status(200).json({
      status: true,
      message: 'please check your email to change password',
    });
  }
);

export const resetPassword = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //get token and password
    const { token } = req.params;
    const { password } = req.body;

    //reset password for user
    await userService.resetPassword(token, password);
    res.status(200).json({
      status: true,
    });
  }
);

export const viewMyProfile = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    //get user profile
    const user = await userService.viewUserProfile(userId);
    //send response
    res.status(200).json({
      status: true,
      data: user,
    });
  }
);

export const changeUserAvatar = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;
    //@ts-ignore
    const result = await userService.changeAvatar(req.file, userId);
    res.status(200).json({
      status: true,
      data: result,
    });
  }
);

export const updateUserInfo = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userUpdateData = { ...req.body };
    const userId = req.user.id;
    //update user info
    const updatedInfo = await userService.updateUserProfile(
      userUpdateData,
      userId
    );
    res.status(200).json({
      status: true,
      data: updatedInfo,
    });
  }
);

export const updateDeliveryAddress = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userAddress = { ...req.body };
    const userId = req.user.id;
    //update user info
    const updatedAddress = await userService.updateDeliveryAddress(
      userAddress,
      userId
    );
    res.status(200).json({
      status: true,
      data: updatedAddress,
    });
  }
);
