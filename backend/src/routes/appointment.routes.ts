import { AppointmentController } from "../controller/AppointmentController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";

export const AppointmentRoutes = [
  {
    method: "get",
    route: "/appointments",
    controller: AppointmentController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "one",
    middlewares: [],
  },
  {
    method: "post",
    route: "/appointments",
    controller: AppointmentController,
    action: "save",
    middlewares: [jwtMiddleware],
  },
  {
    method: "put",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "update",
    middlewares: [],
  },
  {
    method: "delete",
    route: "/appointments/:id",
    controller: AppointmentController,
    action: "remove",
    middlewares: [],
  },
];
