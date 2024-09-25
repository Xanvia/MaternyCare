import { MotherGuideController } from "../controller/MotherGuideController";

export const MotherGuideRoutes = [
  {
    method: "get",
    route: "/mother-guides",
    controller: MotherGuideController,
    action: "all",
    middlewares: [],
  },
  {
    method: "get",
    route: "/mother-guides/:id",
    controller: MotherGuideController,
    action: "one",
    middlewares: [],
  },
  {
    method: "post",
    route: "/mother-guides",
    controller: MotherGuideController,
    action: "save",
    middlewares: [],
  },
  {
    method: "put",
    route: "/mother-guides/:id",
    controller: MotherGuideController,
    action: "update",
    middlewares: [],
  },
  {
    method: "delete",
    route: "/mother-guides/:id",
    controller: MotherGuideController,
    action: "remove",
    middlewares: [],
  },
];
