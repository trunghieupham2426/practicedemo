import { Request, Response, NextFunction } from 'express';

export const JoiValidation = (schema: any) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await schema.validateAsync(req.body);
      next();
    } catch (err) {
      next(err);
    }
  };
};
