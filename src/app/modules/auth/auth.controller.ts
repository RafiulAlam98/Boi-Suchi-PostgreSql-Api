/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ILoginUserResponse } from "./auth.interface";
import { AuthService } from "./auth.service";
import httpStatus from "http-status";

const sendLoginResponse = async (
  res: Response,
  message: string,
  token: string
) => {
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Created Successfully!",
    data: token,
  });
};

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = (await AuthService.loginuser(loginData)) as ILoginUserResponse;
  const { token } = result;
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "User Sign In successfully!",
    data: result,
  });
});

export const AuthController = {
  loginUser,
};
