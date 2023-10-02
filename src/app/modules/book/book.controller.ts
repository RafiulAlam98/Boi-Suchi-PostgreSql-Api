import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { BookServices } from "./book.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { bookFilterableFields } from "./book.constant";

const insertIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await BookServices.insertIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Added successfully",
    data: result,
  });
});

const getAllBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, bookFilterableFields);
  const options = pick(req.query, [
    "limit",
    "page",
    "sortBy",
    "sortOrder",
    "maxPrice",
    "minPrice",
  ]);
  const result = await BookServices.getAllBooks(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Books Retrieved Successfully",
    data: result,
  });
});

const getBooksByCategoryId = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.getBooksByCategoryId(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book  Retrieved successfully",
    data: result,
  });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.getSingleBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Retrieved successfully",
    data: result,
  });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await BookServices.deleteBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Deleted successfully",
    data: result,
  });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const newData = req.body;
  const result = await BookServices.updateBook(id, newData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Book Updated successfully",
    data: result,
  });
});

export const BookControllers = {
  insertIntoDb,
  getAllBooks,
  getSingleBook,
  deleteBook,
  updateBook,
  getBooksByCategoryId,
};
