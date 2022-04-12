import Product from '../../models/ProductCateGory/product.model';
import ProductCategory from '../../models/ProductCateGory/productCategory.model';
import { ProductDto } from './dto/create-product.dto';
import { sequelize } from '../../../sequelize';
import Category from '../../models/ProductCateGory/category.model';
import createError from 'http-errors';
import { CloudinaryService } from '../../utils/Cloudinary/cloudinary.util';
import ProductPhoto from '../../models/ProductCateGory/productPhoto.model';
import { EditProductDto } from './dto/edit-product.dto';
import { Op } from 'sequelize';

const cloudinaryService = new CloudinaryService();
export class ProductService {
  async createProduct(
    productDto: Partial<ProductDto>,
    productPhoto: Express.Multer.File[],
    thumpNail?: Express.Multer.File
  ) {
    return new Promise(async (resolve, reject) => {
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
            imgPublicId: res.public_id,
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
        resolve(newProduct);
      } catch (err) {
        console.log(err);
        //@ts-ignore
        await t.rollback();
        reject(err);
      }
    });
  }

  async getAllProduct() {
    return new Promise(async (resolve, reject) => {
      try {
        const allProduct = await Product.findAndCountAll();
        resolve(allProduct);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getProductDetail(productId: string) {
    return new Promise(async (resolve, reject) => {
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

        resolve(product);
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateProductInfo(
    productId: string,
    editProductData: Partial<EditProductDto>
  ) {
    return new Promise(async (resolve, reject) => {
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

        resolve(product);
      } catch (err) {
        reject(err);
      }
    });
  }

  async deleteProduct(productId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await Product.findByPk(productId);
        if (!product) {
          reject(new createError.NotFound('No product found with this id'));
          return;
        }

        // check if no one buy this product , can delete
        if (product.unitsOnOrder > 0) {
          reject(
            new createError.BadRequest(
              'Product on order ,Can not delete this product'
            )
          );
          return;
        }

        await product.destroy();
        resolve(product);
      } catch (err) {
        reject(err);
      }
    });
  }

  async editProductPhoto(
    productId: string,
    productPhoto?: Express.Multer.File[],
    deletePhotoIds?: string[]
  ) {
    return new Promise(async (resolve, reject) => {
      //create transaction
      const t = await sequelize.transaction();
      console.log(deletePhotoIds);
      try {
        //get product
        const product = await Product.findByPk(productId);

        if (!product) {
          reject(new createError.NotFound('No product found with this id'));
          return;
        }
        //delete photo
        if (deletePhotoIds && deletePhotoIds.length > 0) {
          await ProductPhoto.destroy({
            where: {
              productId,
              imgPublicId: {
                [Op.in]: deletePhotoIds,
              },
            },
            transaction: t,
          });

          //delete photo from cloudinary

          await cloudinaryService.deleteProductPhoto(deletePhotoIds);
        }

        //upload new photos
        if (productPhoto) {
          for (const file of productPhoto) {
            file.filename = `product-${product.productName}-${
              product.id
            }-${Date.now()}`;
            const res = await cloudinaryService.uploadProductPhoto(file);
            await ProductPhoto.create(
              {
                productId,
                imagePath: res.url,
                imgPublicId: res.public_id,
              },
              {
                transaction: t,
              }
            );
          }
        }

        await t.commit();
        resolve(true);
      } catch (err) {
        await t.rollback();
        reject(err);
      }
    });
  }
}
