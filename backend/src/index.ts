import app from "./app";
import { AppDataSource } from "./data-source";
import { User } from "./entity/User";

async function main() {
  // start express server
  app.listen(3000, () => {
    console.log("Express server has started on port 3000.");
  });

  // insert new users for test
  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      firstName: "Timber",
      lastName: "Saw",
      age: 27,
    })
  );

  await AppDataSource.manager.save(
    AppDataSource.manager.create(User, {
      firstName: "Phantom",
      lastName: "Assassin",
      age: 24,
    })
  );

  console.log("Open http://localhost:3000/users to see results");
}

main();
