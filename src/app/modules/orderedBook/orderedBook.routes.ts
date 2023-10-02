import express from "express";
import { OrderedBookControllers } from "./orderedBook.controller";

const router = express.Router();
router.post(
  "/create-orderedBook",

  OrderedBookControllers.insertOrderBookIntoDb
);

router.get("/:id", OrderedBookControllers.getSingleOrderedBook);

router.get("/", OrderedBookControllers.getAllOrderedBooks);

export const OrderedBookRoutes = router;
