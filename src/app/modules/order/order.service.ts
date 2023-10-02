import { Order } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IOrderFilterRequest } from "./order.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { whereCondition } from "../../../helpers/whereCondition";
import { OrderFilterableFields } from "./order.constant";

const insertOrderIntoDb = async (payload: Order) => {
  console.log({ data: payload });
  try {
    const result = await prisma.order.create({ data: payload });
    return result;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Order Already Been placed");
    }
    throw error;
  }
};

const getAllOrders = async (
  filters: IOrderFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Order[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;
  const { whereConditions, sortConditions } = whereCondition(
    searchTerm,
    filtersData,
    OrderFilterableFields,
    sortBy,
    sortOrder
  );
  const result = await prisma.order.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      users: true,
      orderedBooks: true,
    },
  });
  const total = await prisma.order.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleOrder = async (id: string) => {
  const result = await prisma.order.findUnique({
    where: { id },
    include: { orderedBooks: true, users: true },
  });
  return result;
};

const deleteOrder = async (id: string) => {
  try {
    return await prisma.order.delete({
      where: { id },
      include: {
        users: true,
        orderedBooks: true,
      },
    });
  } catch (error) {
    const err = error as any;
    if (err.code === "P2025") {
      throw new ApiError(
        httpStatus.BAD_REQUEST,
        "Order Deleted Successfully! "
      );
    }
  }
};

const updateSingleOrder = async (id: string, newData: Partial<Order>) => {
  try {
    const updatedSemester = await prisma.order.update({
      where: { id },
      data: newData,
      include: {
        orderedBooks: true,
        users: true,
      },
    });

    return updatedSemester;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2025") {
      throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found");
    }
    throw error;
  }
};

export const OrderServices = {
  insertOrderIntoDb,
  deleteOrder,
  getAllOrders,
  getSingleOrder,
  updateSingleOrder,
};
