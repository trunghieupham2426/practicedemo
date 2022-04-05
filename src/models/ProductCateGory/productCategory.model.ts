import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import Category from './category.model';
import Product from './product.model';

@Table({
  tableName: 'ProductCategory',
  timestamps: false,
})
class ProductCategory extends Model {
  //relation
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Category)
  @Column
  categoryId: number;
}
export default ProductCategory;
