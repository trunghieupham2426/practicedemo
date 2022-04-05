import {
  Column,
  Model,
  Table,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';

@Table({
  tableName: 'UserAddress',
  timestamps: false,
})
class UserAddress extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  address: string;

  @Column
  city: string;

  @Column
  country: string;

  @Column
  phone: string;
}
export default UserAddress;
