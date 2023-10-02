import express from "express";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ENUM_USER_ROLE } from "../../../enums/user";
import { CategoryValidation } from "./category.validation";
import { CategoryControllers } from "./category.controller";
const router = express.Router();

router.get("/", CategoryControllers.getAllCategories);

router.post(
  "/create-category",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.createValidation),
  CategoryControllers.insertIntoDb
);

router.get("/:id", CategoryControllers.getSingleCategory);

router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(CategoryValidation.updateValidation),
  CategoryControllers.updateCategory
);

router.delete(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  CategoryControllers.deleteCategory
);



export const CategoryRoutes = router;
