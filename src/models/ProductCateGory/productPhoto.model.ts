import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
  BelongsTo,
  ForeignKey,
} from 'sequelize-typescript';
import Product from './product.model';

@Table({
  tableName: 'ProductPhoto',
  timestamps: false,
})
class ProductPhoto extends Model {
  @Column
  imagePath: string;

  @Column
  imgPublicId: string;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  //relation
  @BelongsTo(() => Product)
  product: Product;
}
export default ProductPhoto;
