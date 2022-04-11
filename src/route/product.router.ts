import express from 'express';
import {
  createProduct,
  editProduct,
  getProductDetail,
} from '../controller/product.controller';
import { adminProtectingRoute } from '../middleware/auth.middleware';
import { JoiValidation } from '../middleware/joi.middleware';
import { uploadStream } from '../middleware/multer.middleware';
import {
  createProductSchema,
  updateProductSchema,
} from '../utils/Validation/Product/productValidate.schema';

export const router = express.Router();

router.use(adminProtectingRoute);

router.route('/').post(
  uploadStream.fields([
    { name: 'thumpNail', maxCount: 1 },
    { name: 'productPhoto', maxCount: 3 },
  ]),
  JoiValidation(createProductSchema),
  createProduct
);

router
  .route('/:productId')
  .get(getProductDetail)
  .patch(JoiValidation(updateProductSchema), editProduct);
