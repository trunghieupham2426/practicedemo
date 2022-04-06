import { Request, Response, NextFunction } from 'express';

export const catchAsync = (cb: Function) => {
  return (req: Request, res: Response, next: NextFunction) => {
    cb(req, res, next).catch((err: any) => {
      return next(err);
    });
  };
};
