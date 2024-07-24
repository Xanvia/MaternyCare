import { UserController } from "../controller/UserController";
import { adminMiddleware } from "../middlewear/adminMiddleware";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";

export const UserRoutes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "getAllUsers",
    middlewares: [jwtMiddleware],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "getOneUser",
    middlewares: [jwtMiddleware],
  },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "removeUser",
    middlewares: [jwtMiddleware],
  },
];
