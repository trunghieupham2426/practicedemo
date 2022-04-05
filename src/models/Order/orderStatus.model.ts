import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'OrderStatus',
  timestamps: false,
})
class OrderStatus extends Model {
  @Column
  orderStatus: string;
}
export default OrderStatus;
