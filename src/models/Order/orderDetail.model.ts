import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
} from 'sequelize-typescript';
import Product from '../ProductCateGory/product.model';
import Order from './order.model';

@Table({
  tableName: 'OrderDetail',
  timestamps: false,
})
class OrderDetail extends Model {
  @Column({
    primaryKey: true,
    autoIncrement: true,
  })
  id: number;

  @Column
  quantity: number;

  @Column({
    type: DataType.DECIMAL,
  })
  totalPrice: number;

  //relation
  @ForeignKey(() => Product)
  @Column
  productId: number;

  @ForeignKey(() => Order)
  @Column
  orderId: number;
}
export default OrderDetail;
