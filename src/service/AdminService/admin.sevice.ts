import User from '../../models/User/user.model';
import { AuthService } from '../UserService/auth.service';
import createError from 'http-errors';

export class AdminService extends AuthService {
  async getAllUser() {
    return new Promise(async (result, reject) => {
      try {
        const users = await User.findAndCountAll();
        result(users);
      } catch (err) {
        reject(err);
      }
    });
  }

  async deleteUser(userId: string) {
    return new Promise(async (result, reject) => {
      try {
        const user = (await this.findUserById(userId)) as User;
        if (!user.isActive) {
          await user.destroy();
          result(true);
        }
        const err = new createError.BadRequest(
          'user is active , can not delete'
        );
        reject(err);
      } catch (err) {
        reject(err);
      }
    });
  }

  async blockUser(userId: string) {
    return new Promise(async (result, reject) => {
      try {
        const user = (await this.findUserById(userId)) as User;
        if (!user.isActive) {
          reject(new createError.BadRequest(`user not active , can't block`));
          return;
        }
        //block user, set isActive = false;
        user.isActive = false;
        user.save();

        result(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  async unblockUser(userId: string) {
    return new Promise(async (result, reject) => {
      try {
        const user = (await this.findUserById(userId)) as User;

        if (user.isActive) {
          reject(new createError.BadRequest(`user already active`));
          return;
        }
        //unblock user, set isActive = true;
        user.isActive = true;
        user.save();

        result(true);
      } catch (err) {
        reject(err);
      }
    });
  }
}
