import {
  Column,
  Model,
  Table,
  DataType,
  ForeignKey,
  BelongsTo,
} from 'sequelize-typescript';
import User from './user.model';

@Table({
  tableName: 'UserInfo',
  timestamps: false,
})
class UserInfo extends Model {
  @ForeignKey(() => User)
  @Column
  userId: number;

  @BelongsTo(() => User)
  user: User;

  @Column
  fullname: string;

  @Column
  phone: string;

  @Column
  birthday: Date;

  @Column
  gender: string;

  @Column({
    type: DataType.STRING,
    defaultValue:
      'https://res.cloudinary.com/dyw35assc/image/upload/v1644906261/DEV/default_gphmz1.png',
  })
  avatarPath: string;
}
export default UserInfo;
