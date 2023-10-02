import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import { OrderControllers } from "./order.controller";

const router = express.Router();
router.post(
  "/create-order",
  auth(ENUM_USER_ROLE.CUSTOMER),
  OrderControllers.insertOrderIntoDb
);

router.get("/:orderId", OrderControllers.getSingleOrder);

router.get("/", auth(ENUM_USER_ROLE.ADMIN), OrderControllers.getAllOrders);

export const OrderRoutes = router;
