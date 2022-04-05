import {
  Column,
  Model,
  Table,
  DataType,
  HasOne,
  BeforeCreate,
} from 'sequelize-typescript';
import bcrypt from 'bcryptjs';

import UserInfo from './userInfo.model';

@Table({
  tableName: 'User',
  timestamps: false,
})
class User extends Model {
  @Column
  username: string;

  @Column
  email: string;

  @Column
  password: string;
  @BeforeCreate
  static async hashPassword(user: User) {
    user.password =
      user.password && user.password !== ''
        ? await bcrypt.hash(user.password, 8)
        : '';
  }

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isAdmin: boolean;

  @Column({
    type: DataType.BOOLEAN,
    defaultValue: false,
  })
  isActive: boolean;

  @Column
  passwordResetToken: string;

  @Column
  passwordResetExpires: Date;

  //relation
  @HasOne(() => UserInfo)
  userInfo: UserInfo;
}
export default User;
