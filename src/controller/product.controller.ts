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
    const { sort } = req.query;
    //@ts-ignore
    const allProduct = await productService.getAllProduct(sort);

    res.status(200).json({
      status: true,
      data: allProduct,
    });
  }
);

export const editProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const productUpdateData = { ...req.body };
    const { productId } = req.params;

    const updatedProduct = await productService.updateProductInfo(
      productId,
      productUpdateData
    );

    res.status(200).json({
      status: true,
      data: updatedProduct,
    });
  }
);

export const getProductDetail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const product = await productService.getProductDetail(req.params.productId);
    res.status(200).json({
      status: true,
      data: product,
    });
  }
);

export const deleteProduct = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    await productService.deleteProduct(productId);

    res.status(200).json({
      status: true,
    });
  }
);

export const editProductPhoto = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { productId } = req.params;
    const { deletePhotoIds } = req.body;

    //@ts-ignore
    const productPhoto = req.files && req.files?.productPhoto;

    await productService.editProductPhoto(
      productId,
      productPhoto,
      deletePhotoIds
    );

    res.status(200).json({
      status: true,
    });
  }
);
