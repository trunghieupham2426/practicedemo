import { UserService } from '../service/UserService/user.service';
import { Request, Response, NextFunction } from 'express';
import { MailService } from '../utils/Nodemailer/nodemailer.util';
import { generateToken } from '../utils/Jwt/jwt.util';
import { UserDto } from '../service/UserService/dto/create-user.dto';

const userService = new UserService();
const mailService = new MailService();

export const createUser = (req: Request, res: Response, next: NextFunction) => {
  const data: UserDto = { ...req.body };
  userService.createUser(data, (err: Error, user: any) => {
    if (err) {
      return next(err);
    }
    //create verify token
    const token = generateToken(
      { email: data.email },
      process.env.JWT_VERIVYEMAILTIME
    );
    //send email to user
    mailService.sendUserConfirmation(data.email, token);
    // send response
    res.status(200).json({
      status: true,
      message: 'check your email to verify account',
    });
  });
};

export const verifyEmail = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  //get email from res.local
  const email = res.locals.email;
  userService.verifyUserEmail(email, (err: Error, user: any) => {
    if (err) {
      return next(err);
    }
    res.status(200).json({
      status: true,
    });
  });
};

export const login = (req: Request, res: Response, next: NextFunction) => {
  const { email, password } = req.body;
  userService.loginUser(email, password, (err: Error, user: any) => {
    if (err) {
      return next(err);
    }
    // generate token
    const token = generateToken({ id: user.id }, process.env.JWT_EXPIRYTIME);

    res.status(200).json({
      status: true,
      token: token,
    });
  });
};
