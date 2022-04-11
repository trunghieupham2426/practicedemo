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
  @ForeignKey(() => Cart)
  @Column
  cartId: number;

  @ForeignKey(() => Product)
  @Column
  productId: number;

  @Column
  quantity: number;
  //relation
}
export default CartItem;
