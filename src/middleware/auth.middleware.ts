require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';
import User from '../models/User/user.model';

export const protectingRoutes = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token =
    req.headers.authorization?.startsWith('Bearer') &&
    req.headers.authorization.split(' ')[1];

  if (!token || token === 'null') {
    //@ts-ignore
    return next(new createError(401, 'You are not logged in'));
  }
  //@ts-ignore
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const user = await User.findOne({
    attributes: { exclude: ['password'] },
    where: { id: decoded.id },
  });
  if (!user) {
    //@ts-ignore
    return next(new createError(401, 'this user does not exist'));
  }
  //@ts-ignore
  req.user = user;
  next();
};
