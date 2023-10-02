import { Book } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import httpStatus from "http-status";
import { IBookFilterRequest } from "./book.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { whereCondition } from "../../../helpers/whereCondition";
import { bookSearchableFields } from "./book.constant";

const insertIntoDb = async (payload: Book): Promise<Book> => {
  try {
    const result = await prisma.book.create({
      data: payload,
      include: { category: true },
    });

    return result;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Book Already Exist!");
    }
    throw error;
  }
};

const getAllBooks = async (
  filters: IBookFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Book[]>> => {
  const { limit, page, skip, sortBy, sortOrder, minPrice, maxPrice } =
    paginationHelpers.calculatePagination(options);

  const { searchTerm, ...filtersData } = filters;
  const { whereConditions, sortConditions } = whereCondition(
    searchTerm,
    filtersData,
    bookSearchableFields,
    sortBy,
    sortOrder,
    maxPrice,
    minPrice
  );
  const result = await prisma.book.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
  });
  const total = await prisma.book.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getBooksByCategoryId = async (id: string) => {
  const result = await prisma.book.findMany({
    where: { categoryId: id },
  });

  return result;
};

const getSingleBook = async (id: string) => {
  try {
    const result = await prisma.book.findUnique({
      where: { id },
      include: { category: true },
    });

    return result;
  } catch (error) {
    throw error;
  }
};

const deleteBook = async (id: string) => {
  try {
    const result = await prisma.book.delete({
      where: {
        id,
      },
    });
    return result;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2025") {
      throw new ApiError(httpStatus.NOT_FOUND, "Book  Not Found!");
    }
  }
};

const updateBook = async (
  id: string,
  newData: Partial<Book>
): Promise<Book | null> => {
  try {
    const updatedDepartment = await prisma.book.update({
      where: { id },
      data: newData,
    });
    return updatedDepartment;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Book already Exist");
    }
    if (err.code === "P2025") {
      throw new ApiError(httpStatus.NOT_FOUND, "Book  Not Found!");
    }
    throw error;
  }
};

export const BookServices = {
  insertIntoDb,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
  getBooksByCategoryId,
};
