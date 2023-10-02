/* eslint-disable no-useless-catch */
import * as bcrypt from "bcrypt";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";

export const hashPassword = async (password: string): Promise<string> => {
  const hashedPassword = await bcrypt.hash(
    password,
    config.bycrypt_salt_rounds as string
  );
  return hashedPassword;
};

export const isPasswordMatched = async (
  plaintextPassword: string,
  hashedPassword: string
): Promise<boolean> => {
  try {
    const match = await bcrypt.compare(plaintextPassword, hashedPassword);
    return match;
  } catch (error) {
    throw new ApiError(
      httpStatus.NOT_ACCEPTABLE,
      "Password did not match! Please Try again."
    );
  }
};
