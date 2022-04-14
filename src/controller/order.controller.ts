import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/ErrorHandler/catchAsync';
import { OrderService } from '../service/OrderService/order.service';

const orderService = new OrderService();

export const checkOut = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const r = await orderService.checkOut(['9', '10'], req.user.id, '1');
    res.send(r);
  }
);
