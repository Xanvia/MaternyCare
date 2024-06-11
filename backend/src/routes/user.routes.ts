import { UserController } from "../controller/UserController";
import { adminMiddleware } from "../middlewear/adminMiddleware";

export const UserRoutes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    middlewares: [],
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    middlewares: [],
  },
];
