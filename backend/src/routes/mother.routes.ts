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
    middlewares: [],
  },
  {
    method: "get",
    route: "/phm/mothers/:id",
    controller: MotherController,
    action: "getPhmAllMothersByPhmId",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "get",
    route: "/phm/user/mothers/:id",
    controller: MotherController,
    action: "getPhmAllMothersByUserId",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },

  {
    method: "get",
    route: "/vog/mothers/",
    controller: MotherController,
    action: "getMothersByRiskType",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
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
    method: "put",
    route: "/users/mother/:id/basic-details",
    controller: MotherController,
    action: "updateBasicDetails",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [jwtMiddleware],
  },
  {
    method: "put",
    route: "/users/mother/:id/update-dashboard",
    controller: MotherController,
    action: "updateDashboard",
    // middlewares: [jwtMiddleware, roleMiddleware("mother")],
    middlewares: [],
  },

  {
    method: "put",
    route: "/users/mother/:id/signature",
    controller: MotherController,
    action: "updateSignature",
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
