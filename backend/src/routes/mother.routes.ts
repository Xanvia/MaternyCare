import { MotherController } from "../controller/MotherController";

export const MotherRoutes = [
  {
    method: "get",
    route: "/mothers",
    controller: MotherController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/mothers/:id",
    controller: MotherController,
    action: "one",
    middlewares: [],
  },
  {
    method: "post",
    route: "/mothers",
    controller: MotherController,
    action: "save",
    middlewares: [],
  },
  {
    method: "delete",
    route: "/mothers/:id",
    controller: MotherController,
    action: "remove",
    middlewares: [],
  },
];
