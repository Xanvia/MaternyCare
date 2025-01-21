// src/routes/device.routes.ts
import { DeviceController } from "../controller/DeviceController";
// import { jwtMiddleware } from "../middlewear/jwtMiddleware";

export const DeviceRoutes = [
  {
    method: "post",
    route: "/device/start",
    controller: DeviceController,
    action: "startDevice",
    middlewares: [],
  },
  {
    method: "post",
    route: "/device/stop",
    controller: DeviceController,
    action: "stopDevice",
    middlewares: [],
  },
  {
    method: "get",
    route: "/device/data",
    controller: DeviceController,
    action: "fetchData",
    middlewares: [],
  },
];
