// import { AppointmentController } from "../controller/AppointmentController";
import { FeedbackController } from "../controller/FeedbackController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";

export const FeedbackRoutes = [
  {
    method: "get",
    route: "/feedbacks",
    controller: FeedbackController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/feedbacks/:id",
    controller: FeedbackController,
    action: "one",
    middlewares: [],
  },
  {
    method: "post",
    route: "/feedbacks",
    controller: FeedbackController,
    action: "save",
    middlewares: [jwtMiddleware],
  },
];
