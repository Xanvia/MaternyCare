import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User, UserRole } from "../entity/User";
<<<<<<< HEAD
import { Phm } from "../entity/Phm";
=======
>>>>>>> 3e822c78ec434cfd129e23f1ef75f7787b39521e
import { generateAppointmentsForMother } from "../service/mothreAppointmentGenerater";
import * as jwt from "jsonwebtoken";

export class MotherController {
  private motherRepository = AppDataSource.getRepository(Mother);
  private userRepository = AppDataSource.getRepository(User);
  private phmRepository = AppDataSource.getRepository(Phm);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.motherRepository.find({ relations: ["user", "phm"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    // const user = await this.userRepository.findOne({ where: { id } });
    // console.log("mother from single: " + user);
    const mother = await this.motherRepository.findOne({
      where: { id },
      relations: ["user", "phm"],
    });

    if (!mother) {
      return "unlisted mother";
    }
    return mother;
  }

  async save(request: Request, response: Response, next: NextFunction) {
<<<<<<< HEAD
    const { age, nic, risk_type, phone_1, bio, phmId } = request.body;
=======
    const { age, nic, risk_type, phone_1, bio, delivery_date } = request.body;
>>>>>>> 3e822c78ec434cfd129e23f1ef75f7787b39521e

    if (request.user.userRole !== "mother") {
      console.log(request.user.userRole);
      // return "You are not authorized to create a Mother";
      return response
        .status(403)
        .json({ message: "You are not authorized to create a Mother" });
    }

    const userId = request.user?.userId;
    

    if (!userId) {
      return response
        .status(400)
        .json({ error: "User ID is missing or invalid" });
    }

    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      // const mother = Object.assign(new Mother(), {
      //   age,
      //   nic,
      //   risk_type,
      //   phone_1,
      //   bio,
      //   user: user,
      // });

      const mother = new Mother();
      mother.age = age;
      mother.nic = nic;
<<<<<<< HEAD
      //mother.delivery_date = delivery_date;
=======
      mother.delivery_date = delivery_date;
>>>>>>> 3e822c78ec434cfd129e23f1ef75f7787b39521e
      mother.risk_type = risk_type;
      mother.phone_1 = phone_1;
      mother.bio = bio;
      mother.user = user; // Set the user relationship

<<<<<<< HEAD
=======
      

>>>>>>> 3e822c78ec434cfd129e23f1ef75f7787b39521e
      const savedMother = await this.motherRepository.save(mother);
      
      // Generate a JWT
      const token = jwt.sign(
        {motherId: savedMother.id},
        process.env.JWT_SECRET!
      );

      response.send({mother: savedMother, token});
      return;
    } catch (error) {
      return next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let motherToRemove = await this.motherRepository.findOneBy({ id });

    if (!motherToRemove) {
      return "this mother not exist";
    }

    await this.motherRepository.remove(motherToRemove);

    return "mother has been removed";
  }
}
