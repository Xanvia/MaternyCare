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
    method: "get",
    route: "/appointments/user/:id",
    controller: AppointmentController,
    action: "getMotherAppoinments",
    middlewares: [],
  },
  {
    method: "get",
    route: "/appointments/mother/:id",
    controller: AppointmentController,
    action: "getMotherAppoinmentsfromMotherId",
    middlewares: [],
  },
  {
    method: "post",
    route: "/appointments/:userId",
    controller: AppointmentController,
    action: "save",
    middlewares: [],
  },
  {
    method: "post",
    route: "/appointments/generate/prenatal",
    controller: AppointmentController,
    action: "generateAppointment",
    middlewares: [jwtMiddleware],
  },
  {
    method: "post",
    route: "/appointments/generate/postnatal",
    controller: AppointmentController,
    action: "generatePostnatalAppointment",
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
