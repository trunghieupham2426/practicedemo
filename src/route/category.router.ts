import express from 'express';
import {
  createCategory,
  deleteCategory,
  editCategory,
  getAllCategory,
  viewCategoryDetail,
} from '../controller/category.controller';
import { uploadStream } from '../middleware/multer.middleware';
import { JoiValidation } from '../middleware/joi.middleware';
import {
  createCategorySchema,
  updateCategorySchema,
} from '../utils/Validation/Category/categoryValidate.schema';
import { adminProtectingRoute } from '../middleware/auth.middleware';
export const router = express.Router();

router.use(adminProtectingRoute);

router
  .route('/')
  .get(getAllCategory)
  .post(
    uploadStream.single('categoryThumpNail'),
    JoiValidation(createCategorySchema),
    createCategory
  );

router
  .route('/:categoryId')
  .get(viewCategoryDetail)
  .patch(
    uploadStream.single('categoryThumNail'),
    JoiValidation(updateCategorySchema),
    editCategory
  )
  .delete(deleteCategory);
