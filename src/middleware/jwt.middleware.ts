require('dotenv').config();
import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import createError from 'http-errors';

export const verifyEmailToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { token } = req.params;
  try {
    //@ts-ignore
    const decoded = await jwt.verify(token, process.env.JWT_SECRET);
    res.locals.email = decoded.email;
    next();
  } catch (err: any) {
    if (err.name === 'TokenExpiredError')
      next(
        new createError.Unauthorized('token expired , can not active email')
      );
    if (err.name === 'JsonWebTokenError')
      next(new createError.Unauthorized('Invalid token'));
  }
};
