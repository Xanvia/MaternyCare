import { jwtMiddleware } from "../middlewear/jwtMiddleware";
import { UserController } from "../controller/UserController";

export const AuthRoutes = [
  {
    method: "post",
    route: "/login",
    controller: UserController,
    action: "login",
    middlewares: [],
  },

  {
    method: "post",
    route: "/register",
    controller: UserController,
    action: "createUser",
    middlewares: [],
  },
];
