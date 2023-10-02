import { OrderedBook } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IOrderedBooksFilterRequest } from "./orderedBook.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { whereCondition } from "../../../helpers/whereCondition";
import { orderedBookSearchableFields } from "./orderedBook.constant";

const insertOrderBookIntoDb = async (
  payload: OrderedBook
): Promise<OrderedBook> => {
  const { bookId, quantity } = payload;
  try {
    return await prisma.orderedBook.create({
      data: {
        bookId,
        quantity: quantity,
      },
    });
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Book Already Ordered");
    }
    throw error;
  }
};
const getAllOrderedBooks = async (
  filters: IOrderedBooksFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<OrderedBook[]>> => {
  const { limit, page, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;
  const { whereConditions, sortConditions } = whereCondition(
    searchTerm,
    filtersData,
    orderedBookSearchableFields,
    sortBy,
    sortOrder
  );
  const result = await prisma.orderedBook.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      books: true,
      orders: true,
    },
  });
  const total = await prisma.orderedBook.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleOrderedBook = async (id: string) => {
  const result = await prisma.orderedBook.findMany({
    where: {
      id,
    },
    include: {
      books: true,
      orders: true,
    },
  });
  return result;
};

export const OrderedBookServices = {
  insertOrderBookIntoDb,
  getAllOrderedBooks,
  getSingleOrderedBook,
};
