import { PrismaClient, User } from "@prisma/client";
import ApiError from "../../../errors/ApiError";
import { IUserFilterRequest } from "./user.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { whereCondition } from "../../../helpers/whereCondition";
import { userSearchableFields } from "./user.constant";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import config from "../../../config";
import prisma from "../../../shared/prisma";

const createUser = async (payload: User): Promise<User> => {
  try {
    const result = await prisma.user.create({
      data: payload,
    });
    return result;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(409, "User is already Exist !! ");
    }
    throw error;
  }
};

const getAllUsers = async (
  filters: IUserFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<User[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const { whereConditions, sortConditions } = whereCondition(
    searchTerm,
    filtersData,
    userSearchableFields,
    sortBy,
    sortOrder
  );
  const result = await prisma.user.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
  });
  const total = await prisma.user.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const updateSingleUser = async (id: string, newData: Partial<User>) => {
  try {
    const updatedSemester = await prisma.user.update({
      where: { id },
      data: newData,
    });
    return updatedSemester;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(409, "This User is already Exist");
    }
    if (err.code === "P2025") {
      throw new ApiError(404, "User  Not Found !!!");
    }
    throw error;
  }
};

const getSingleUser = async (id: string) => {
  const result = await prisma.user.findUnique({
    where: { id },
  });
  return result;
};

const getProfile = async (token: any) => {
  const decoded = jwtHelpers.verifyToken(token, config.jwt.secret as string);
  const result = await prisma.user.findUnique({
    where: { id: decoded.id },
  });
  return result;
};

const deleteUser = async (id: string) => {
  try {
    return await prisma.user.delete({
      where: { id },
    });
  } catch (error) {
    const err = error as any;
    if (err.code === "P2025") {
      throw new ApiError(404, "User Not Found !!!");
    }
  }
};

export const UserServices = {
  createUser,
  deleteUser,
  getSingleUser,
  updateSingleUser,
  getProfile,
  getAllUsers,
};
