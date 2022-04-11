import {
  Column,
  Model,
  Table,
  DataType,
  HasOne,
  BelongsToMany,
  ForeignKey,
} from 'sequelize-typescript';
import PaymentType from '../Payment/paymentType.model';
import Product from '../ProductCateGory/product.model';
import User from '../User/user.model';
import UserAddress from '../User/userAddress.model';
import OrderDetail from './orderDetail.model';
import OrderStatus from './orderStatus.model';

@Table({
  tableName: 'Order',
  timestamps: false,
})
class Order extends Model {
  @Column({
    type: DataType.DECIMAL,
  })
  totalPrice: number;

  @Column
  orderDate: Date;

  @Column
  completeDate: Date;

  @Column
  paymentDate: Date;

  @ForeignKey(() => PaymentType)
  @Column
  paymentMethodId: number;

  @ForeignKey(() => OrderStatus)
  @Column
  orderStatusId: number;

  @ForeignKey(() => UserAddress)
  @Column
  userDeliveryId: number;

  @ForeignKey(() => User)
  @Column
  userId: number;

  //relation
  @BelongsToMany(() => Product, () => OrderDetail)
  product: Product;
}
export default Order;
