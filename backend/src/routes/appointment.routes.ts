import { AppointmentController } from "../controller/AppointmentController";

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
