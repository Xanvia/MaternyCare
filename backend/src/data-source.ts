import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Notice } from "./entity/Notice";
import { Mother } from "./entity/Mother";
import { Phm } from "./entity/Phm";
import { Appointment } from "./entity/Appointment";
import { FieldArea } from "./entity/FieldArea";
import { Feedback } from "./entity/Feedback";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "letmein",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User, Notice, Mother, Phm, Appointment, Feedback, FieldArea],
  migrations: [],
  subscribers: [],
});
