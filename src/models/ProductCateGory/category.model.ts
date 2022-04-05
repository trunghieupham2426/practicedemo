import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
} from 'sequelize-typescript';
import Product from './product.model';
import ProductCategory from './productCategory.model';

@Table({
  tableName: 'Category',
  timestamps: false,
})
class Category extends Model {
  @Column
  categoryName: string;

  @Column
  desc: string;

  @Column({
    type: DataType.STRING,
    defaultValue:
      'https://res.cloudinary.com/dyw35assc/image/upload/v1644906261/DEV/default_gphmz1.png',
  })
  thumpNail: string;

  //relation
  @BelongsToMany(() => Product, () => ProductCategory)
  product: Product[];
}
export default Category;
