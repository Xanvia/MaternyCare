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
