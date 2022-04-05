import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import Order from '../Order/order.model';
import OrderDetail from '../Order/orderDetail.model';
import Category from './category.model';
import ProductCategory from './productCategory.model';
import ProductPhoto from './productPhoto.model';

@Table({
  tableName: 'Product',
  timestamps: false,
})
class Product extends Model {
  @Column
  productName: string;

  @Column
  desc: string;

  @Column({
    type: DataType.STRING,
    defaultValue:
      'https://res.cloudinary.com/dyw35assc/image/upload/v1644906261/DEV/default_gphmz1.png',
  })
  thumpNail: string;

  @Column({
    type: DataType.DECIMAL,
  })
  price: number;

  @Column
  unitsInStock: number;

  @Column
  unitsOnOrder: number;

  //relation
  @BelongsToMany(() => Category, () => ProductCategory)
  category: Category[];

  @HasMany(() => ProductPhoto)
  photo: ProductPhoto[];

  @BelongsToMany(() => Order, () => OrderDetail)
  order: Order[];
}
export default Product;
