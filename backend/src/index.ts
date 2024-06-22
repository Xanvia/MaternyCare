import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { UserRoutes } from "./routes/user.routes";
import { NoticeRoutes } from "./routes/notice.routes";
// import { User } from "./entity/User";
import { Notice } from "./entity/Notice";
import * as cors from "cors"; // import cors
import { AuthRoutes } from "./routes/auth.routes";
import { jwtMiddleware } from "./middlewear/jwtMiddleware";
import { User } from "./entity/User";
import { RequestHandler } from "express"; // import RequestHandler from express
// import stringify from "json-stringify-safe";
import { AppointmentRoutes } from "./routes/appointment.routes";
import { Appointment } from "./entity/Appointment";
import { Mother } from "./entity/Mother";
import { Phm } from "./entity/Phm";

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
    ];

    AllRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
        ...route.middlewares,
        (req: Request, res: Response, next: Function) => {
          const result = new (route.controller as any)()[route.action](
            req,
            res,
            next
          );
          if (result instanceof Promise) {
            result.then((result) =>
              result !== null && result !== undefined
                ? res.send(result)
                : undefined
            );
          } else if (result !== null && result !== undefined) {
            res.json(result);
          }
        }
      );
    });

    // const motherEntity1 = new Mother();
    // await AppDataSource.manager.save(motherEntity1);

    // await AppDataSource.manager.save(AppDataSource.manager.create(Mother, {}));

    // const motherId = 1; // replace with actual mother ID
    // const phmId = 1; // replace with actual PHM ID

    // const motherRepository = AppDataSource.manager.getRepository(Mother);
    // const motherEntity = await motherRepository.findOne({
    //   where: { id: motherId },
    // });

    // const phmRepository = AppDataSource.manager.getRepository(Phm);
    // const phmEntity = await phmRepository.findOne({ where: { id: phmId } });

    // const appointments = [
    //   {
    //     type: "prenatal",
    //     dateRange: "[2022-01-01,2022-12-31]", // replace with actual value
    //     checkedByMother: false,
    //     checkedByPHM: false,
    //     mother: motherEntity,
    //     phm: phmEntity,
    //   },
    //   {
    //     type: "postnatal",
    //     dateRange: "[2022-01-01,2022-12-31]", // replace with actual value
    //     checkedByMother: false,
    //     checkedByPHM: false,
    //     mother: motherEntity,
    //     phm: phmEntity,
    //   },
    //   // add more appointment objects here
    // ];

    // const appointmentEntities = AppDataSource.manager.create(
    //   Appointment,
    //   appointments
    // );

    // await AppDataSource.manager.save(appointmentEntities);

    app.listen(3000);

    console.log("Express server has started on port 3000");
  })
  .catch((error) => console.log(error));

// import * as express from "express";
// import * as bodyParser from "body-parser";
// import { Request, Response, NextFunction } from "express";
// import { AppDataSource } from "./data-source";
// import { UserRoutes } from "./routes/user.routes";
// import { NoticeRoutes } from "./routes/notice.routes";
// import { Notice } from "./entity/Notice";
// import * as cors from "cors";
// import { AuthRoutes } from "./routes/auth.routes";
// import { RequestHandler } from "express";
// import { User } from "./entity/User";

// AppDataSource.initialize()
//   .then(async () => {
//     // Create Express app
//     const app = express();

//     // Use middlewares
//     app.use(bodyParser.json());
//     app.use(cors());

//     // Define the Route interface
//     interface Route {
//       method: string;
//       route: string;
//       controller: any;
//       action: string;
//       middlewares?: RequestHandler[];
//     }

//     // Aggregate all routes
//     const AllRoutes: Route[] = [...UserRoutes, ...NoticeRoutes, ...AuthRoutes];

//     // Register routes with the Express app
//     // AllRoutes.forEach((route) => {
//     //   const {
//     //     method,
//     //     route: path,
//     //     controller,
//     //     action,
//     //     middlewares = [],
//     //   } = route;
//     //   const handler = async (
//     //     req: Request,
//     //     res: Response,
//     //     next: NextFunction
//     //   ) => {
//     //     try {
//     //       const result = await new (controller as any)()[action](
//     //         req,
//     //         res,
//     //         next
//     //       );
//     //       if (result !== null && result !== undefined) {
//     //         res.json(result);
//     //       }
//     //     } catch (error) {
//     //       next(error);
//     //     }
//     //   };

//     //   (app as any)[method](path, ...middlewares, handler);
//     // });

//     AllRoutes.forEach((route) => {
//       app[route.method](
//         route.route,
//         ...route.middlewares,
//         async (req: Request, res: Response, next: NextFunction) => {
//           try {
//             const controllerInstance = new (route.controller as any)();
//             const result = await controllerInstance[route.action](
//               req,
//               res,
//               next
//             );

//             if (result !== null && result !== undefined) {
//               if (typeof result === "object" && !(result instanceof Error)) {
//                 res.json(result); // Serialize as JSON if result is a plain object
//               } else {
//                 res.send(result); // Send as plain text or other types
//               }
//             } else {
//               res.end(); // Ensure response ends if no result is returned
//             }
//           } catch (error) {
//             console.error("Error in route handler:", error);
//             res.status(500).json({ message: "Internal server error" });
//           }
//         }
//       );
//     });

//     // Start the server
//     app.listen(3000, () => {
//       console.log("Express server has started on port 3000");
//     });
//   })
//   .catch((error) => console.error("Error initializing the app:", error));
