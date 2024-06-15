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
    const AllRoutes = [...UserRoutes, ...NoticeRoutes, ...AuthRoutes];

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

    // AllRoutes.forEach((route) => {
    //   (app as any)[route.method](
    //     route.route,
    //     ...route.middlewares,
    //     (req: Request, res: Response, next: Function) => {
    //       const result = new (route.controller as any)()[route.action](
    //         req,
    //         res,
    //         next
    //       );
    //       if (result instanceof Promise) {
    //         result.then((result) =>
    //           result !== null && result !== undefined
    //             ? res.send(stringify(result))
    //             : undefined
    //         );
    //       } else if (result !== null && result !== undefined) {
    //         res.json(stringify(result));
    //       }
    //     }
    //   );
    // });

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(Notice, {
    //     title: "Phantom",
    //     subtitle: "Assassin",
    //     message: "Test api 1",
    //   })
    // );

    // await AppDataSource.manager.save(
    //   AppDataSource.manager.create(User, {
    //     firstName: "Yasela",
    //     lastName: "Dissanayake",
    //     email: "yasela2014@gmai.com",
    //     password: "1234",
    //   })
    // );

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
