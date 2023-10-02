import { Request, Response } from "express";
import catchAsync from "../../../shared/catchAsync";
import { OrderServices } from "./order.service";
import httpStatus from "http-status";
import sendResponse from "../../../shared/sendResponse";
import pick from "../../../shared/pick";
import { OrderFilterableFields } from "./order.constant";
import ApiError from "../../../errors/ApiError";

const insertOrderIntoDb = catchAsync(async (req: Request, res: Response) => {
  const result = await OrderServices.insertOrderIntoDb(req.body);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Added Successfully!",
    data: result,
  });
});

const getAllOrders = catchAsync(async (req: Request, res: Response) => {
  const filters = pick(req.query, OrderFilterableFields);
  const options = pick(req.query, ["limit", "page", "sortBy", "sortOrder"]);

  const result = await OrderServices.getAllOrders(filters, options);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Retrieved Successfully !",
    data: result,
  });
});

const deleteOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await OrderServices.deleteOrder(id);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Deleted Successfully !",
    data: result,
  });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await OrderServices.getSingleOrder(id);

  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, "Order Not Found");
  }

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Retrieved Successfully !",
    data: result,
  });
});

const updateSingleOrder = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const newData = req.body;
  const result = await OrderServices.updateSingleOrder(id, newData);
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: "Order Updated Successfully !",
    data: result,
  });
});

export const OrderControllers = {
  insertOrderIntoDb,
  getAllOrders,
  getSingleOrder,
  deleteOrder,
  updateSingleOrder,
};
