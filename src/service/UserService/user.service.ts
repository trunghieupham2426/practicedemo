import User from '../../models/User/user.model';
import UserInfo from '../../models/User/userInfo.model';
import { UserDto } from './dto/create-user.dto';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';

export class UserService {
  async createUser(userDto: UserDto, cb: Function) {
    const data = { ...userDto };
    const user = await User.findOne({ where: { email: data.email } });
    //check user exist or not
    if (user) {
      const err = new createError.BadRequest('Email already in use');
      cb(err, null);
      return;
    }
    //create new user
    const newUser = await User.create(data);
    //add userProfile
    await UserInfo.create({ userId: newUser.id });

    return cb(null, newUser);
  }

  async verifyUserEmail(email: string, cb: Function) {
    try {
      const user = await this.findUserByEmail(email);
      user.isActive = true;
      user.save();
      return cb(null, user);
    } catch (err) {
      cb(err, null);
    }
  }

  async loginUser(email: string, password: string, cb: Function) {
    let err;
    try {
      const user = await this.findUserByEmail(email);

      //check user active or not
      if (!user.isActive) {
        err = new createError.BadRequest(
          'your account has been disabled or not active yet , please contact admin'
        );
        return cb(err, null);
      }

      //compare password correct or not
      const isCorrect = await bcrypt.compare(password, user.password);
      if (!isCorrect) {
        err = new createError.BadRequest('password not correct');
        return cb(err, null);
      }

      return cb(null, user);
    } catch (err) {
      cb(err, null);
    }
  }

  async findUserByEmail(email: string) {
    const user = await User.findOne({ where: { email } });
    if (!user) {
      throw new createError.NotFound('user email not found');
    }
    return user;
  }
}
