import { PrismaClient, User } from "@prisma/client";
import { generateUserId } from "../../../helpers/generateId";
import prisma from "../../../shared/prisma";
import * as bcrypt from "bcrypt";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { ILoginUser, ILoginUserResponse } from "./auth.interface";
import { isPasswordMatched } from "./auth.utils";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import { Secret } from "jsonwebtoken";

const signUp = async (payload: User): Promise<User> => {
  try {
    const { password, ...userData } = payload;
    const hashedPassword = await bcrypt.hash(password, 10);

    const userId = await generateUserId();
    const result = await prisma.user.create({
      data: {
        ...userData,
        password: hashedPassword,
        userId: userId,
      },
    });
    return result;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(httpStatus.BAD_REQUEST, "User already Exist !! ");
    }
    throw error;
  }
};

const loginuser = async (
  payload: ILoginUser
): Promise<ILoginUserResponse | undefined> => {
  const { email, password } = payload;
  console.log(payload);
  const isFound = await prisma.user.findFirst({
    where: { email: email },
  });
  console.log(email);

  if (!isFound) {
    throw new ApiError(httpStatus.BAD_REQUEST, "User does not exist");
  }

  if (isFound) {
    const isMatched = await isPasswordMatched(password, isFound.password);

    if (!isMatched) {
      throw new ApiError(httpStatus.UNAUTHORIZED, "Incorrect Password ");
    }

    const role = isFound.role;
    const userId = isFound.userId;
    const id = isFound.id;
    const token = jwtHelpers.createToken(
      { role, userId, id },

      config.jwt.secret as Secret,
      config.jwt.expires_in as string
    );

    return {
      token,
    };
  }
};
export const AuthService = {
  loginuser,
  signUp,
};
