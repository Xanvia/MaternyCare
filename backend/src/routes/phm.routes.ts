import { PhmController } from "../controller/PhmController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";
import { roleMiddleware } from "../middlewear/roleMiddleware";

export const PhmRoutes = [
  {
    method: "get",
    route: "/users/phms/all",
    controller: PhmController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/phms/:id",
    controller: PhmController,
    action: "one",
    // middlewares: [jwtMiddleware, roleMiddleware("phm")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "post",
    route: "/users/phms",
    controller: PhmController,
    action: "save",
    middlewares: [jwtMiddleware, roleMiddleware("phm")],
  },
  {
    method: "delete",
    route: "/users/phms/:id",
    controller: PhmController,
    action: "remove",
    middlewares: [jwtMiddleware, roleMiddleware("phm")],
  },
];
