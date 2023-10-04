/* eslint-disable no-unused-vars */
import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";

import { AuthService } from "./auth.service";
import httpStatus from "http-status";
import { IUserLoginResponse } from "./auth.interface";

const sendLoginResponse = async (
  res: Response,
  message: string,
  token: string
) => {
  sendResponse<IUserLoginResponse>(res, {
    statusCode: httpStatus.OK,
    success: true,
    message,
    token,
  });
};

const loginUser = catchAsync(async (req: Request, res: Response) => {
  const { ...loginData } = req.body;
  const result = (await AuthService.loginuser(loginData)) as IUserLoginResponse;
  const { token } = result;
  console.log(result.token);
  sendLoginResponse(res, "User Sign In successfully!", token);
});

export const AuthController = {
  loginUser,
};
