import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
  HasMany,
} from 'sequelize-typescript';
import User from '../User/user.model';
import CartItem from './cartitem.model';

@Table({
  tableName: 'Cart',
  timestamps: false,
})
class Cart extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User, { onDelete: 'CASCADE' })
  user: User;

  @Column({
    defaultValue: 'open', //open or checked out
  })
  cartStatus: string;
  //relation

  @HasMany(() => CartItem)
  cartItem: CartItem;
}
export default Cart;
