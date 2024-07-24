import * as express from "express";
import * as bodyParser from "body-parser";
import { Request, Response, NextFunction } from "express";
import { AppDataSource } from "./data-source";
import { UserRoutes } from "./routes/user.routes";
import { NoticeRoutes } from "./routes/notice.routes";
import { AuthRoutes } from "./routes/auth.routes";
import { AppointmentRoutes } from "./routes/appointment.routes";
import * as cors from "cors"; // import cors
import { RequestHandler } from "express"; // import RequestHandler from express
import { User, UserRole } from "./entity/User";
import { Moh } from "./entity/Moh";
import { Appointment } from "./entity/Appointment";

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

    // // Create User, Moh, and Appointment tables
    // const userRepository = AppDataSource.getRepository(User);
    // const mohRepository = AppDataSource.getRepository(Moh);

    // // Creating sample user and moh data
    // const user = new User();
    // user.firstName = "Sahan";
    // user.lastName = "Maleesha";
    // user.email = "sahan.doe@example.com";
    // user.password = "securepassword2";
    // user.isVerified = true;
    // user.role = UserRole.MOH; // or any valid role

    // const moh = new Moh();
    // moh.phone = 1234567793;
    // moh.mohId = "MOH002";
    // moh.nic = "1234567892V";
    // moh.mohArea = "Area 2";
    // moh.motherCount = 1;
    // moh.babyCount = 1;
    // moh.starPoints = 0;
    // moh.user = user;

    // await userRepository.save(user);
    // await mohRepository.save(moh);

    // // Creating a sample appointment
    // const appointment = new Appointment();
    // appointment.appointment_type = "prenatal";
    // appointment.dateRange = "[2022-01-01,2022-12-31]"; // replace with actual value
    // appointment.checkedByMother = false;
    // appointment.checkedByPHM = false;
    // appointment.moh = moh;

    // const appointmentRepository = AppDataSource.getRepository(Appointment);
    // await appointmentRepository.save(appointment);

    app.listen(3000, () => {
      console.log("Express server has started on port 3000");
    });
  })
  .catch((error) => console.log(error));
