import { Category } from "@prisma/client";
import prisma from "../../../shared/prisma";
import ApiError from "../../../errors/ApiError";
import { ICategoryFilterRequest } from "./category.interface";
import { IPaginationOptions } from "../../../interfaces/pagination";
import { IGenericResponse } from "../../../interfaces/common";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { whereCondition } from "../../../helpers/whereCondition";
import { categorySearchableFields } from "./category.constant";
import httpStatus from "http-status";

const insertIntoDb = async (payload: Category): Promise<Category> => {
  try {
    const result = await prisma.category.create({
      data: payload,
    });
    return result;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Category Already Exist!");
    }
    throw error;
  }
};

const getAllCategories = async (
  filters: ICategoryFilterRequest,
  options: IPaginationOptions
): Promise<IGenericResponse<Category[]>> => {
  const { page, limit, skip, sortBy, sortOrder } =
    paginationHelpers.calculatePagination(options);
  const { searchTerm, ...filtersData } = filters;
  const { whereConditions, sortConditions } = whereCondition(
    searchTerm,
    filtersData,
    categorySearchableFields,
    sortBy,
    sortOrder
  );
  const result = await prisma.category.findMany({
    where: whereConditions,
    skip,
    take: limit,
    orderBy: sortConditions,
    include: {
      books: true,
    },
  });
  const total = await prisma.category.count();
  return {
    meta: {
      total,
      page,
      limit,
    },
    data: result,
  };
};

const getSingleCategory = async (id: string) => {
  const result = await prisma.category.findUnique({
    where: { id },
    include: {
      books: true,
    },
  });
  return result;
};

const deleteCategory = async (id: string) => {
  try {
    return await prisma.category.delete({
      where: { id },
    });
  } catch (error) {
    const err = error as any;
    if (err.code === "P2025") {
      throw new ApiError(httpStatus.NOT_FOUND, "Category  Not Found!");
    }
  }
};

const updateSingleCategory = async (id: string, newData: Partial<Category>) => {
  try {
    const updatedSemester = await prisma.category.update({
      where: { id },
      data: newData,
      include: {
        books: true,
      },
    });
    return updatedSemester;
  } catch (error) {
    const err = error as any;
    if (err.code === "P2002") {
      throw new ApiError(httpStatus.BAD_REQUEST, "Category Already Exist!");
    }
    if (err.code === "P2025") {
      throw new ApiError(httpStatus.NOT_FOUND, "Category  Not Found!");
    }
    throw error;
  }
};

export const CategoryServices = {
  insertIntoDb,
  deleteCategory,
  getAllCategories,
  getSingleCategory,
  updateSingleCategory,
};
