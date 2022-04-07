import { Request, Response, NextFunction } from 'express';
import { AdminService } from '../service/AdminService/admin.sevice';
import { catchAsync } from '../utils/ErrorHandler/catchAsync';
import User from '../models/User/user.model';

const adminService = new AdminService();

export const viewAllUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const users = await adminService.getAllUser();
    res.status(200).json({
      status: true,
      data: users,
    });
  }
);

export const viewUserDetail = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    //get user detail
    const userDetail = await adminService.viewUserProfile(userId);
    //send response
    res.status(200).json({
      status: true,
      data: userDetail,
    });
  }
);

export const deleteUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    //delete user
    await adminService.deleteUser(userId);
    //send response
    res.status(200).json({
      status: true,
    });
  }
);

export const blockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    //block user
    await adminService.blockUser(userId);
    //send response
    res.status(200).json({
      status: true,
    });
  }
);

export const unBlockUser = catchAsync(
  async (req: Request, res: Response, next: NextFunction) => {
    const { userId } = req.params;
    //unblock user
    await adminService.unblockUser(userId);
    //send response
    res.status(200).json({
      status: true,
    });
  }
);
