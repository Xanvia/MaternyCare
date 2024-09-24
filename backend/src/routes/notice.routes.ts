import { NoticeController } from "../controller/NoticeController";

export const NoticeRoutes = [
  {
    method: "get",
    route: "/notices",
    controller: NoticeController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/notices/:id",
    controller: NoticeController,
    action: "one",
    middlewares: [],
  },
  {
    method: "post",
    route: "/notices",
    controller: NoticeController,
    action: "save",
    middlewares: [],
  },
  {
    method: "put",
    route: "/notices/:id",
    controller: NoticeController,
    action: "update",
    middlewares: [],
  },
  {
    method: "delete",
    route: "/notices/:id",
    controller: NoticeController,
    action: "remove",
    middlewares: [],
  },
];
