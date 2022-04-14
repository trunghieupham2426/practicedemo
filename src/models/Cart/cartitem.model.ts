import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import Product from '../ProductCateGory/product.model';
import Cart from './cart.model';

@Table({
  tableName: 'CartItem',
  timestamps: false,
})
class CartItem extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @ForeignKey(() => Cart)
  @Column
  userId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column
  quantity: number;
  //relation

  @BelongsTo(() => Product)
  product: Product;
}
export default CartItem;
