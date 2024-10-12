import { PhmController } from "../controller/PhmController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";
import { roleMiddleware } from "../middlewear/roleMiddleware";

export const PhmRoutes = [
  {
    method: "get",
    route: "/users/phm/all",
    controller: PhmController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/phm/:id",
    controller: PhmController,
    action: "one",
    // middlewares: [jwtMiddleware, roleMiddleware("phm")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "post",
    route: "/users/phm",
    controller: PhmController,
    action: "save",
    middlewares: [jwtMiddleware],
  },
  {
    method: "delete",
    route: "/users/phm/:id",
    controller: PhmController,
    action: "remove",
    middlewares: [jwtMiddleware],
  },

  {
    method: "post",
    route: "/users/phm/addMother",
    controller: PhmController,
    action: "addMother",
    middlewares: [jwtMiddleware], // Only PHMs can add mothers
  },
];
