import { UserController } from "../controller/UserController";

export const UserRoutes = [
  {
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one",
    middlewares: [],
  },
  // {
  //   method: "post",
  //   route: "/users",
  //   controller: UserController,
  //   action: "save",
  // },
  {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove",
    middlewares: [],
  },
];
