import { NextFunction, Request, Response } from 'express';
import { catchAsync } from '../utils/ErrorHandler/catchAsync';
import { CartService } from '../service/CartService/cart.service';

const cartService = new CartService();

export const getUserCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const cart = await cartService.getUserCart(userId);

    res.status(200).json({
      status: true,
      data: cart,
    });
  }
);

export const addItemToCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const userId = req.user.id;

    const { productId, quantity } = req.body;

    const result = await cartService.addToCart(userId, productId, quantity);

    res.send(result);
  }
);

export const removeItemFromCart = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { cartItemId } = req.params;

    await cartService.removeCartItem(cartItemId);

    res.status(200).json({
      status: true,
    });
  }
);
