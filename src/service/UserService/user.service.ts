import User from '../../models/User/user.model';
import UserInfo from '../../models/User/userInfo.model';
import UserAddress from '../../models/User/userAddress.model';
import { UserDto } from './dto/create-user.dto';
import createError from 'http-errors';
import { AuthService } from './auth.service';
import { CloudinaryService } from '../../utils/Cloudinary/cloudinary.util';
import { UserUpdateProfileDto } from './dto/updateprofile-user.dto';
import { UserDeliveryAddressDto } from './dto/updateDeliveryAddress.dto';

const cloudinaryService = new CloudinaryService();

export class UserService extends AuthService {
  async createUser(userDto: UserDto) {
    return new Promise(async (resolve, reject) => {
      const data = { ...userDto };
      try {
        const user = await User.findOne({ where: { email: data.email } });
        //check user exist or not
        if (user) {
          const err = new createError.BadRequest('Email already in use');
          reject(err);
          return;
        }
        //create new user
        const newUser = await User.create(data);
        //add userProfile
        await UserInfo.create({ userId: newUser.id });
        //add userAddress
        await UserAddress.create({ userId: newUser.id });
        resolve(newUser);
      } catch (err) {
        reject(err);
      }
    });
  }

  async changeAvatar(file: Express.Multer.File, userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        //get user info
        const userInfo = (await this.findUserProfileById(userId)) as UserInfo;
        //upload user avatar to cloudinary
        const res = await cloudinaryService.uploadChangeAvatar(file);
        //save avatar url
        userInfo.avatarPath = res.url;
        userInfo.save();
        //
        resolve(userInfo);
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateUserProfile(
    userUpdateDto: Partial<UserUpdateProfileDto>,
    userId: string
  ) {
    return new Promise(async (resolve, reject) => {
      const updateData = { ...userUpdateDto };
      try {
        //get User info
        const userInfo = (await this.findUserProfileById(userId)) as UserInfo;
        //update user information and save
        Object.assign(userInfo, updateData);
        userInfo.save();

        resolve(userInfo);
      } catch (err) {
        reject(err);
      }
    });
  }

  async updateDeliveryAddress(
    userDeliveryAddress: Partial<UserDeliveryAddressDto>,
    userId: string
  ) {
    return new Promise(async (resolve, reject) => {
      const updateAddressData = { ...userDeliveryAddress };
      try {
        //get User address
        const userAddress = (await UserAddress.findOne({
          where: { userId },
        })) as UserAddress;

        if (!userAddress) {
          const err = new createError.NotFound(
            `User not found , can't update address `
          );
          reject(err);
          return;
        }

        //update address
        Object.assign(userAddress, updateAddressData);
        userAddress.save();

        resolve(userAddress);
      } catch (err) {
        reject(err);
      }
    });
  }

  async findUserProfileById(userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const userInfo = (await UserInfo.findOne({
          where: { userId },
        })) as UserInfo;

        if (!userInfo) {
          const err = new createError.NotFound('User not found');
          reject(err);
          return;
        }

        resolve(userInfo);
      } catch (err) {
        reject(err);
      }
    });
  }

  async getUserAddress(userId: string) {
    return new Promise(async (resolve, reject) => {
      try {
        const userAddress = (await UserAddress.findOne({
          where: { userId },
        })) as UserAddress;

        if (!userAddress) {
          const err = new createError.NotFound('address not found');
          reject(err);
          return;
        }

        resolve(userAddress);
      } catch (err) {
        reject(err);
      }
    });
  }
}
