import { Request, Response, NextFunction } from 'express';
import { catchAsync } from '../utils/ErrorHandler/catchAsync';
import { ProductService } from '../service/ProductService/product.service';
import createError from 'http-errors';

const productService = new ProductService();

export const createProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    //@ts-ignore
    const productThumpNail = req.files?.thumpNail && req.files.thumpNail[0];
    //@ts-ignore
    const productPhoto = req.files.productPhoto;
    if (!productPhoto) {
      //@ts-ignore
      return next(new createError(400, 'product photo is required'));
    }
    const product = await productService.createProduct(
      req.body,
      productPhoto,
      productThumpNail
    );

    res.status(200).json({
      status: true,
      data: product,
    });
  }
);

export const getAllProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const allProduct = await productService.getAllProduct();

    res.status(200).json({
      status: true,
      data: allProduct,
    });
  }
);

export const editProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {}
);

export const getProductDetail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productService.getProductDetail(req.params.productId);
    res.send(product);
  }
);
