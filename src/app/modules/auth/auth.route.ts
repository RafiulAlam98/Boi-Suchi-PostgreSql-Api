import express from "express";
import validateRequest from "../../middlewares/validateRequest";
import { UserControllers } from "../user/user.controller";
import { AuthController } from "./auth.controller";
import { AuthValidation } from "./auth.validation";

const router = express.Router();

router.post("/signup", UserControllers.createUser);
router.post(
  "/signin",
  validateRequest(AuthValidation.loginZodSchema),
  AuthController.loginUser
);

export const AuthRoutes = router;
