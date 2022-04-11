import {
  Column,
  Model,
  Table,
  DataType,
  BelongsToMany,
  HasMany,
} from 'sequelize-typescript';
import CartItem from '../Cart/cartitem.model';
import Order from '../Order/order.model';
import OrderDetail from '../Order/orderDetail.model';
import Category from './category.model';
import ProductCategory from './productCategory.model';
import ProductPhoto from './productPhoto.model';

export enum productStatusEnum {
  ACTIVE = 'active',
  INACTIVE = 'inActive',
}

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
      'https://res.cloudinary.com/dyw35assc/image/upload/v1649346692/PRODUCT/productdefault_dydttz.jpg',
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

  @Column({
    defaultValue: productStatusEnum.ACTIVE,
    //active or inActive
  })
  productStatus: string;

  //relation
  @BelongsToMany(() => Category, () => ProductCategory)
  category: Category[];

  @HasMany(() => ProductPhoto)
  photo: ProductPhoto[];

  @BelongsToMany(() => Order, () => OrderDetail)
  order: Order[];

  @HasMany(() => CartItem)
  cartItemId: CartItem;
}
export default Product;
