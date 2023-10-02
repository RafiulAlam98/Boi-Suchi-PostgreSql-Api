import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderedBookServices } from "./orderedBook.service";
import sendResponse from "../../../shared/sendResponse";
import httpStatus from "http-status";
import pick from "../../../shared/pick";
import { orderedBookFilterableFields } from "./orderedBook.constant";

const insertOrderBookIntoDb = catchAsync(
  async (req: Request, res: Response) => {
    const result = await OrderedBookServices.insertOrderBookIntoDb(req.body);
    sendResponse(res, {
      statusCode: httpStatus.OK,
      success: true,
      message: "OrderedBook created successfully",
      data: result,
    });
  }
);

const getAllOrderedBooks = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, orderedBookFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);
  const result = await OrderedBookServices.getAllOrderedBooks(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OrderedBooks Retrieved Successfully",
    data: result,
  });
});

const getSingleOrderedBook = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderedBookServices.getSingleOrderedBook(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "OrderedBook Retrieved successfully",
    data: result,
  });
});

export const OrderedBookControllers = {
  insertOrderBookIntoDb,
  getAllOrderedBooks,
  getSingleOrderedBook,
};
