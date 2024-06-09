import { NoticeController } from "../controller/NoticeController";

export const NoticeRoutes = [
  {
    method: "get",
    route: "/notices",
    controller: NoticeController,
    action: "all",
  },
  {
    method: "get",
    route: "/notices/:id",
    controller: NoticeController,
    action: "one",
  },
  {
    method: "post",
    route: "/notices",
    controller: NoticeController,
    action: "save",
  },
  {
    method: "delete",
    route: "/notices/:id",
    controller: NoticeController,
    action: "remove",
  },
];
