import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookControllers } from "./book.controller";
import { BookValidation } from "./book.validation";

const router = express.Router();

router.post(
  "/create-book",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.addBookValidation),
  BookControllers.insertIntoDb
);

router.get("/:id", BookControllers.getSingleBook);

router.get("/:categoryId/category", BookControllers.getBooksByCategoryId);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(BookValidation.updateBookValidation),
  BookControllers.updateBook
);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), BookControllers.deleteBook);

router.get("/", BookControllers.getAllBooks);

export const BookRoutes = router;
