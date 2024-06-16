import { UserController } from "../controller/UserController";
import { adminMiddleware } from "../middlewear/adminMiddleware";

export const UserRoutes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "getAllUsers",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "getOneUser",
    middlewares: [],
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "removeUser",
    middlewares: [],
  },
];
