import { MotherGuideController } from "../controller/MotherGuideController";

export const MotherGuideRoutes = [
  {
    method: "get",
    route: "/guide",
    controller: MotherGuideController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/guide/:id",
    controller: MotherGuideController,
    action: "one",
    middlewares: [],
  },
  {
    method: "post",
    route: "/guide",
    controller: MotherGuideController,
    action: "save",
    middlewares: [],
  },
  {
    method: "put",
    route: "/guide/:id",
    controller: MotherGuideController,
    action: "update",
    middlewares: [],
  },
  {
    method: "delete",
    route: "/guide/:id",
    controller: MotherGuideController,
    action: "remove",
    middlewares: [],
  },
];
