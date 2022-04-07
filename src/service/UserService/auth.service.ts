import User from '../../models/User/user.model';
import UserInfo from '../../models/User/userInfo.model';
import UserAddress from '../../models/User/userAddress.model';
import createError from 'http-errors';
import bcrypt from 'bcryptjs';
import crypto from 'crypto';
import { Op } from 'sequelize';

export class AuthService {
  async verifyUserEmail(email: string) {
    return new Promise(async (result, reject) => {
      try {
        const user = (await this.findUserByEmail(email)) as User;
        user.isActive = true;
        user.save();
        result(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  async loginUser(email: string, password: string) {
    return new Promise(async (result, reject) => {
      let err;
      try {
        const user = (await this.findUserByEmail(email)) as User;
        //check user active or not
        if (!user.isActive) {
          err = new createError.BadRequest(
            'your account has been disabled or not active yet , please contact admin'
          );
          reject(err);
          return;
        }
        //compare password correct or not
        const isCorrect = await bcrypt.compare(password, user.password);
        if (!isCorrect) {
          err = new createError.BadRequest('password not correct');
          reject(err);
        }
        result(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findUserByEmail(email: string) {
    return new Promise(async (result, reject) => {
      try {
        const user = await User.findOne({ where: { email } });
        if (!user) {
          const err = new createError.NotFound('user email not found');
          reject(err);
          return;
        }
        result(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findUserById(id: string) {
    return new Promise(async (result, reject) => {
      try {
        const user = await User.findOne({ where: { id } });
        if (!user) {
          const err = new createError.NotFound('user not found');
          reject(err);
          return;
        }
        result(user);
      } catch (err) {
        reject(err);
      }
    });
  }

  async forgotPassword(email: string) {
    return new Promise(async (result, reject) => {
      try {
        //find user
        const user = (await this.findUserByEmail(email)) as User;
        //generate reset password token
        const randomToken = crypto.randomBytes(12).toString('hex');
        //hash randomToken
        const hashRandomToken = crypto
          .createHash('sha256')
          .update(randomToken)
          .digest('hex');
        //set expiry time 3m
        const passwordResetExpires = (Date.now() + 3 * 60 * 1000) as any;
        //save hashRandomToken and expiry time to User table
        user.passwordResetToken = hashRandomToken;
        user.passwordResetExpires = passwordResetExpires;
        user.save();
        //send randomToken to user
        result(randomToken);
      } catch (err) {
        reject(err);
      }
    });
  }

  async resetPassword(token: string, newPassword: string) {
    return new Promise(async (result, reject) => {
      try {
        // hash the token received from user
        const hashToken = crypto
          .createHash('sha256')
          .update(token)
          .digest('hex');

        //find user with hashToken and compare time
        const user = (await User.findOne({
          where: {
            passwordResetToken: hashToken,
            passwordResetExpires: {
              [Op.gt]: Date.now(),
            },
          },
        })) as User;

        //check user exist
        if (!user) {
          const err = new createError.NotFound('invalid token or expired');
          reject(err);
          return;
        }

        //save new password for user
        const hashNewPassword = await bcrypt.hash(newPassword, 8);
        user.password = hashNewPassword;
        //@ts-ignore
        user.passwordResetExpires = null;
        //@ts-ignore
        user.passwordResetToken = null;
        user.save();

        result(true);
      } catch (err) {
        reject(err);
      }
    });
  }

  async viewUserProfile(userId: string) {
    return new Promise(async (result, reject) => {
      try {
        const user = await User.findOne({
          where: { id: userId },
          include: [UserInfo, UserAddress],
          attributes: {
            exclude: [
              'password',
              'isAdmin',
              'passwordResetToken',
              'passwordResetExpires',
            ],
          },
        });
        result(user);
      } catch (err) {
        reject(err);
      }
    });
  }
}
