import { VogController } from "../controller/VogController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";

export const VogRoutes = [
  {
    method: "get",
    route: "/users/vog/all",
    controller: VogController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/vog/:id",
    controller: VogController,
    action: "one",
    middlewares: [jwtMiddleware],
  },
  {
    method: "post",
    route: "/users/vog",
    controller: VogController,
    action: "save",
    middlewares: [jwtMiddleware],
  },
  {
    method: "put",
    route: "/users/vog/:id/personal-info",
    controller: VogController,
    action: "updateVogPersonalInfo",
    middlewares: [jwtMiddleware],
  },
  {
    method: "delete",
    route: "/users/vog/:id",
    controller: VogController,
    action: "remove",
    middlewares: [jwtMiddleware],
  },
];
