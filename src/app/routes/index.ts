import express from "express";
import { UserRoutes } from "../modules/user/user.routes";
import { AuthRoutes } from "../modules/auth/auth.route";
import { CategoryRoutes } from "../modules/category/category.routes";
import { BookRoutes } from "../modules/book/book.routes";
import { OrderRoutes } from "../modules/order/order.routes";
import { OrderedBookRoutes } from "../modules/orderedBook/orderedBook.routes";

const router = express.Router();
const moduleRoutes = [
  {
    path: "/users",
    route: UserRoutes,
  },
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/category",
    route: CategoryRoutes,
  },
  {
    path: "/book",
    route: BookRoutes,
  },
  {
    path: "/orderBook",
    route: OrderedBookRoutes,
  },
  {
    path: "/order",
    route: OrderRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));
export default router;
