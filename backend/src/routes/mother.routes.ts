import { MotherController } from "../controller/MotherController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";

export const MotherRoutes = [
  {
    method: "get",
    route: "/users/mothers",
    controller: MotherController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/mothers/:id",
    controller: MotherController,
    action: "one",
    middlewares: [jwtMiddleware],
  },
  {
    method: "post",
    route: "/users/mothers",
    controller: MotherController,
    action: "save",
    middlewares: [jwtMiddleware],
  },
  {
    method: "delete",
    route: "/users/mothers/:id",
    controller: MotherController,
    action: "remove",
    middlewares: [jwtMiddleware],
  },
];
