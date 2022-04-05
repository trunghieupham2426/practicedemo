import { Column, Model, Table } from 'sequelize-typescript';

@Table({
  tableName: 'PaymentType',
  timestamps: false,
})
class PaymentType extends Model {
  @Column
  paymentType: string;
}
export default PaymentType;
