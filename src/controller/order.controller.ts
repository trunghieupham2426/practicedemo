import { NextFunction } from 'express';
import { catchAsync } from '../utils/ErrorHandler/catchAsync';

export const checkOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);
