import { Request, Response, NextFunction } from 'express';
import { CategoryService } from '../service/CategoryService/category.service';
import { catchAsync } from '../utils/ErrorHandler/catchAsync';
import createError from 'http-errors';

const categoryService = new CategoryService();

export const createCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const file = req.file;

    if (!file) {
      //@ts-ignore
      return next(new createError(400, 'category thumpnail is required'));
    }
    const data = { ...req.body };
    //create category
    const result = await categoryService.createCategory(
      data,
      file as Express.Multer.File
    );

    res.send(result);
  }
);

export const getAllCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const listCategory = await categoryService.getAllCategory();

    res.status(200).json({
      status: true,
      data: listCategory,
    });
  }
);

export const viewCategoryDetail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;

    const category = await categoryService.findCategoryById(categoryId);

    res.status(200).json({
      status: true,
      data: category,
    });
  }
);

export const editCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;
    //
    const editedCategory = await categoryService.editCategory(
      categoryId,
      req.body,
      req.file
    );

    res.status(200).json({
      status: true,
      data: editedCategory,
    });
  }
);

export const deleteCategory = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { categoryId } = req.params;

    const result = await categoryService.deleteCategory(categoryId);

    res.status(200).json({
      status: true,
    });
  }
);
