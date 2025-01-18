// Import statements at the top
import { DeviceController } from "../controller/DeviceController";
import { jwtMiddleware } from "../middlewear/jwtMiddleware";
// DeviceRoutes configuration
export const DeviceRoutes = [
  {
    method: "post",
    route: "/device/start",
    controller: DeviceController,
    action: "startDevice",
    middlewares: [jwtMiddleware], // Only authenticated users can start monitoring
  },
  {
    method: "post",
    route: "/device/stop",
    controller: DeviceController,
    action: "stopDevice",
    middlewares: [jwtMiddleware], // Only authenticated users can stop monitoring
  },
  {
    method: "get",
    route: "/device/data",
    controller: DeviceController,
    action: "fetchData",
    middlewares: [jwtMiddleware], // Only authenticated users can fetch data
  },
];
