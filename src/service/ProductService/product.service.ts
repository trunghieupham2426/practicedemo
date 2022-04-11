import Product from '../../models/ProductCateGory/product.model';
import ProductCategory from '../../models/ProductCateGory/productCategory.model';
import { ProductDto } from './dto/create-product.dto';
import { sequelize } from '../../../sequelize';
import Category from '../../models/ProductCateGory/category.model';
import createError from 'http-errors';
import { CloudinaryService } from '../../utils/Cloudinary/cloudinary.util';
import ProductPhoto from '../../models/ProductCateGory/productPhoto.model';
import { EditProductDto } from './dto/edit-product.dto';

const cloudinaryService = new CloudinaryService();
export class ProductService {
  async createProduct(
    productDto: Partial<ProductDto>,
    productPhoto: Express.Multer.File[],
    thumpNail?: Express.Multer.File
  ) {
    return new Promise(async (result, reject) => {
      //create transaction
      const t = await sequelize.transaction();
      const productPhotoData = [];
      const data = { ...productDto };
      try {
        //====UPLOAD PHOTO====
        //thumpNail
        if (thumpNail) {
          thumpNail.filename = `product-thumpNail-${
            data.productName
          }-${Date.now()}`;
          const res = await cloudinaryService.uploadProductPhoto(thumpNail);

          //save url of productThumpNail
          data.thumpNail = res.url;
        }

        //create new Product and get id
        const newProduct = await Product.create(data, { transaction: t });

        //product photo
        for (const file of productPhoto) {
          file.filename = `product-${newProduct.productName}-${
            newProduct.id
          }-${Date.now()}`;
          const res = await cloudinaryService.uploadProductPhoto(file);
          productPhotoData.push({
            productId: newProduct.id as string,
            imagePath: res.url,
          });
        }
        //create PRODUCT_PHOTO TABLE

        await ProductPhoto.bulkCreate(productPhotoData, {
          transaction: t,
        });

        // ========END PHOTO ========

        const productCategoryData = data.categoryId?.map((el) => ({
          categoryId: el,
          productId: newProduct.id as string,
        }));
        //create PRODUCT_CATEGORY TABLE
        //@ts-ignore
        await ProductCategory.bulkCreate(productCategoryData, {
          transaction: t,
        });

        await t.commit();
        result(newProduct);
      } catch (err) {
        console.log(err);
        //@ts-ignore
        await t.rollback();
        reject(err);
      }
    });
  }

  async getAllProduct() {
    return new Promise(async (result, reject) => {
      try {
        const allProduct = await Product.findAndCountAll();
        result(allProduct);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getProductDetail(productId: string) {
    return new Promise(async (result, reject) => {
      try {
        const product = await Product.findOne({
          where: { id: productId },
          include: [
            {
              model: Category,
              through: {
                attributes: [],
              },
            },
            {
              model: ProductPhoto,
            },
          ],
        });

        if (!product) {
          reject(new createError.NotFound('No product found with this id'));
          return;
        }

        result(product);
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateProductInfo(
    productId: string,
    editProductData: Partial<EditProductDto>
  ) {
    return new Promise(async (result, reject) => {
      const data = { ...editProductData };
      try {
        // get the product
        const product = (await Product.findByPk(productId)) as Product;
        if (!product) {
          reject(new createError.NotFound('No product found with this id'));
          return;
        }
        // check valid photo path if user want to make photo as default thumpNail
        if (data.thumpNail) {
          const photo = await ProductPhoto.findOne({
            where: {
              productId,
              imagePath: data.thumpNail,
            },
          });

          if (!photo) {
            reject(
              new createError.BadRequest('Photo not belong to this product')
            );
            return;
          }
        }

        //update product info
        Object.assign(product, data);
        product.save();

        result(product);
      } catch (err) {
        reject(err);
      }
    });
  }
}
