import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response } from "express";
import { AppDataSource } from "./data-source";
import { UserRoutes } from "./routes/user.routes";
import { NoticeRoutes } from "./routes/notice.routes";
// import { User } from "./entity/User";
import { Notice } from "./entity/Notice";
import * as cors from "cors"; // import cors

AppDataSource.initialize()
  .then(async () => {
    // create express app
    const app = express();
    app.use(bodyParser.json());
    app.use(cors()); // use cors as middleware

    // register express routes from defined application routes
    const AllRoutes = [...UserRoutes, ...NoticeRoutes];

    AllRoutes.forEach((route) => {
      (app as any)[route.method](
        route.route,
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

    // setup express app here
    // ...

    await AppDataSource.manager.save(
      AppDataSource.manager.create(Notice, {
        title: "Phantom",
        subtitle: "Assassin",
        message: "Test api 1",
      })
    );

    // start express server
    app.listen(3000);

    console.log("Express server has started on port 3000");
  })
  .catch((error) => console.log(error));
