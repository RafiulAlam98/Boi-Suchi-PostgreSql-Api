import express from "express";
import { ENUM_USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "./user.controller";
import { UserValidation } from "./user.validation";

const router = express.Router();

router.get("/profile", UserControllers.getProfile);
router.get("/:id", auth(ENUM_USER_ROLE.ADMIN), UserControllers.getSingleUser);
router.patch(
  "/:id",
  auth(ENUM_USER_ROLE.ADMIN),
  validateRequest(UserValidation.updateValidationSchema),
  UserControllers.updateSingleUser
);
router.delete("/:id", auth(ENUM_USER_ROLE.ADMIN), UserControllers.deleteUser);
router.get("/", auth(ENUM_USER_ROLE.ADMIN), UserControllers.getAllUsers);

export const UserRoutes = router;
