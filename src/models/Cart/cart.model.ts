import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
  BelongsToMany,
} from 'sequelize-typescript';
import Product from '../ProductCateGory/product.model';
import User from '../User/user.model';
import CartItem from './cartitem.model';

@Table({
  tableName: 'Cart',
  timestamps: false,
})
class Cart extends Model {
  @ForeignKey(() => User)
  @Column({
    primaryKey: true,
  })
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    defaultValue: 'open', //open or checked out
  })
  cartStatus: string;
  //relation

  @BelongsToMany(() => Product, () => CartItem)
  product: Product;

  @HasMany(() => CartItem)
  cartItem: CartItem;
}
export default Cart;
