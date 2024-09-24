import { PhmController } from "../controller/PhmController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";

export const PhmRoutes = [
  {
    method: "get",
    route: "/users/phms",
    controller: PhmController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/phms/:id",
    controller: PhmController,
    action: "one",
    middlewares: [jwtMiddleware],
  },
  {
    method: "post",
    route: "/users/phms",
    controller: PhmController,
    action: "save",
    middlewares: [jwtMiddleware],
  },
  {
    method: "delete",
    route: "/users/phms/:id",
    controller: PhmController,
    action: "remove",
    middlewares: [jwtMiddleware],
  },
];
