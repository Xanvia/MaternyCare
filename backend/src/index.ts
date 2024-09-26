import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { UserRoutes } from "./routes/user.routes";
import { NoticeRoutes } from "./routes/notice.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { AppointmentRoutes } from "./routes/appointment.routes";
import { PhmRoutes } from "./routes/phm.routes";
import { MotherRoutes } from "./routes/mother.routes";
//import { MotherGuideRoutes } from "./routes/motherGuide.routes";
// import * as cors from "cors"; // import cors
import { RequestHandler } from "express"; // import RequestHandler from express
import { User, UserRole } from "./entity/User";
import { Moh } from "./entity/Moh";
import { Appointment } from "./entity/Appointment";
import { MotherGuideRoutes } from "./routes/motherGuide.routes";

const cors = require("cors");
require("dotenv").config();

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors()); // use cors as middleware

    interface Route {
      method: string;
      route: string;
      controller: any;
      action: string;
      middlewares?: RequestHandler[];
    }

    // register express routes from defined application routes
    const AllRoutes = [
      ...UserRoutes,
      ...NoticeRoutes,
      ...AuthRoutes,
      ...AppointmentRoutes,
      ...MotherGuideRoutes,
      ...PhmRoutes,
      ...MotherRoutes,
    ];

    AllRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        ...route.middlewares,
        async (req: Request, res: Response, next: NextFunction) => {
          try {
            const controllerInstance = new (route.controller as any)();
            const result = await controllerInstance[route.action](
              req,
              res,
              next
            );

            if (result !== null && result !== undefined) {
              if (typeof result === "object" && !(result instanceof Error)) {
                res.json(result); // Serialize as JSON if result is a plain object
              } else {
                res.send(result); // Send as plain text or other types
              }
            } else {
              res.end(); // Ensure response ends if no result is returned
            }
          } catch (error) {
            console.error("Error in route handler:", error);
            res.status(500).json({ message: "Internal server error" });
          }
        }
      );
    });

    app.listen(3000, () => {
      console.log("Express server has started on port 3000");
    });
  })
  .catch((error) => console.log(error));
