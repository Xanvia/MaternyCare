import "reflect-metadata"; // This import is needed for TypeORM
import express from "express";
import { AppDataSource } from "./data-source";
import { Routes } from "./routes";

class App {
  public app: express.Application;

  constructor() {
    this.app = express();
    this.database();
    this.middlewares();
    this.routes();
  }

  private async database(): Promise<void> {
    await AppDataSource.connect();
    console.log("Database connected");
  }

  private middlewares(): void {
    this.app.use(express.json());
  }

  private routes(): void {
    Routes.forEach((route) => {
      (this.app as any)[route.method](
        route.route,
        (
          req: express.Request,
          res: express.Response,
          next: express.NextFunction
        ) => {
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
  }
}

export default new App().app;
