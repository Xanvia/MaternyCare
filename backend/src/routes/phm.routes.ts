import { PhmController } from "../controller/PhmController";

export const PhmRoutes = [
  {
    method: "get",
    route: "/users/phms",
    controller: PhmController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/phms/:id",
    controller: PhmController,
    action: "one",
    middlewares: [],
  },
  {
    method: "post",
    route: "/users/phms",
    controller: PhmController,
    action: "save",
    middlewares: [],
  },
  {
    method: "delete",
    route: "/users/phms/:id",
    controller: PhmController,
    action: "remove",
    middlewares: [],
  },
];
