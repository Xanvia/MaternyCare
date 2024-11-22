import { MohController } from "../controller/MohController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";
import { roleMiddleware } from "../middlewear/roleMiddleware";

export const MohRoutes = [
  {
    method: "get",
    route: "/users/moh/all",
    controller: MohController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/moh/:id",
    controller: MohController,
    action: "one",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "post",
    route: "/users/moh",
    controller: MohController,
    action: "save",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "put",
    route: "/users/moh/:id/basic-details",
    controller: MohController,
    action: "updateBasicDetails",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "delete",
    route: "/users/moh/:id",
    controller: MohController,
    action: "remove",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
];
