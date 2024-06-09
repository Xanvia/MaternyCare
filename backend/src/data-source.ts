import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Notice } from "./entity/Notice";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "letmein",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User, Notice],
  migrations: [],
  subscribers: [],
});
