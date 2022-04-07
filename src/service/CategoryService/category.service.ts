import createError from 'http-errors';
import Category from '../../models/ProductCateGory/category.model';
import { CategoryDto } from './dto/create-category.dto';
import { CloudinaryService } from '../../utils/Cloudinary/cloudinary.util';
import { UpdateCategoryDto } from './dto/update-category.dto';

const cloudinaryService = new CloudinaryService();

export class CategoryService {
  async createCategory(
    categoryDto: Partial<CategoryDto>,
    file: Express.Multer.File
  ) {
    return new Promise(async (result, reject) => {
      const data = { ...categoryDto };
      try {
        const category = await Category.findOne({
          where: { categoryName: data.categoryName },
        });
        //check category exist or not
        if (category) {
          const err = new createError.BadRequest('category is exist');
          reject(err);
          return;
        }
        //upload category thumpNail
        const res = await cloudinaryService.uploadCategoryThumpNail(file);
        data.thumpNail = res.url;
        //create new category
        const newCategory = await Category.create(data);
        result(newCategory);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findCategoryByName(name: string) {
    return new Promise(async (result, reject) => {
      try {
        const category = await Category.findOne({
          where: { categoryName: name },
        });
        if (!category) {
          const err = new createError.NotFound('category not found');
          reject(err);
          return;
        }
        result(category);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findCategoryById(id: string) {
    return new Promise(async (result, reject) => {
      try {
        const category = await Category.findByPk(id);
        if (!category) {
          reject(new createError.NotFound('category not found'));
          return;
        }
        result(category);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getAllCategory() {
    return new Promise(async (result, reject) => {
      try {
        const listCategory = await Category.findAndCountAll();
        result(listCategory);
      } catch (err) {
        reject(err);
      }
    });
  }

  async editCategory(
    categoryId: string,
    updateData: Partial<UpdateCategoryDto>,
    file?: Express.Multer.File
  ) {
    return new Promise(async (result, reject) => {
      const data = { ...updateData };
      try {
        const category = (await this.findCategoryById(categoryId)) as Category;
        //throw error if user try to edit categoryName already exist
        if (data.categoryName) {
          // find category with given categoryName
          const foundCategory = await Category.findOne({
            where: { categoryName: data.categoryName },
          });

          if (foundCategory && foundCategory.id !== category.id) {
            reject(new createError.NotFound('category in used'));
            return;
          }
        }
        //check if file is define
        if (file) {
          //upload category thumpNail
          file.filename = `category-${category.categoryName}-${category.id}`;
          const res = await cloudinaryService.uploadCategoryThumpNail(file);
          data.thumpNail = res.url;
        }

        //update data
        Object.assign(category, data);
        category.save();

        //return category
        result(category);
      } catch (err) {
        reject(err);
      }
    });
  }
}
