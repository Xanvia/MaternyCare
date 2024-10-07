import { MotherController } from "../controller/MotherController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";
import { roleMiddleware } from "../middlewear/roleMiddleware";

export const MotherRoutes = [
  {
    method: "get",
    route: "/users/mother/all",
    controller: MotherController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/mother/:id",
    controller: MotherController,
    action: "one",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "post",
    route: "/users/mother",
    controller: MotherController,
    action: "save",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "delete",
    route: "/users/mother/:id",
    controller: MotherController,
    action: "remove",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
];
