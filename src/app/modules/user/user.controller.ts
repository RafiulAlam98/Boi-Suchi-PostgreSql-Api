import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { Request, Response } from "express";
import pick from "../../../shared/pick";
import { userFilterableFields } from "./user.constant";
import { UserServices } from "./user.service";
import ApiError from "../../../errors/ApiError";
import { AuthService } from "../auth/auth.service";

const createUser = catchAsync(async (req: Request, res: Response) => {
  const result = await AuthService.signUp(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully!",
    data: result,
  });
});

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, userFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await UserServices.getAllUsers(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Users retrieved successfully!",
    data: result,
  });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await UserServices.deleteUser(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Deleted successfully !",
    data: result,
  });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await UserServices.getSingleUser(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "User not found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Single User retrieved successfully!",
    data: result,
  });
});

const updateSingleUser = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const newData = req.body;
  const result = await UserServices.updateSingleUser(id, newData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Updated  successfully !",
    data: result,
  });
});

const getProfile = catchAsync(async (req: Request, res: Response) => {
  const { token } = req.headers;

  const result = await UserServices.getProfile(token);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Profile retrieved successfully !",
    data: result,
  });
});

export const UserControllers = {
  createUser,
  getProfile,
  getAllUsers,
  getSingleUser,
  deleteUser,
  updateSingleUser,
};
