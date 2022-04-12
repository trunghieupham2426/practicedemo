import express from 'express';
import {
  createProduct,
  deleteProduct,
  editProduct,
  editProductPhoto,
  getAllProduct,
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

router
  .route('/')
  .post(
    uploadStream.fields([
      { name: 'thumpNail', maxCount: 1 },
      { name: 'productPhoto', maxCount: 3 },
    ]),
    JoiValidation(createProductSchema),
    createProduct
  )
  .get(getAllProduct);

router
  .route('/:productId')
  .post(
    uploadStream.fields([{ name: 'productPhoto', maxCount: 3 }]),
    editProductPhoto
  )
  .get(getProductDetail)
  .patch(JoiValidation(updateProductSchema), editProduct)
  .delete(deleteProduct);
