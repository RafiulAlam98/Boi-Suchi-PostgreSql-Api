import { ENUM_USER_ROLE } from "../../../enums/user";

export type ILoginUser = {
  email: string;
  password: string;
};

export type ILoginUserResponse = {
  token: string;
};

export type IRefreshTokenResponse = {
  token: string;
  role?: string;
};

export type IVerifiedLoginUser = {
  email: string;
  role: ENUM_USER_ROLE;
};

export type IChangePassword = {
  oldPassword: string;
  newPassword: string;
};
