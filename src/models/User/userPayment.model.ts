import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';

@Table({
  tableName: 'UserPayment',
  timestamps: false,
})
class UserPayment extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  paymentType: string;

  @Column
  provider: string;

  @Column
  accountNumber: number;

  @Column
  expiry: Date;
}
export default UserPayment;
