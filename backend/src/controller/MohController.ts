import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Moh } from "../entity/Moh";
import { Phm } from "../entity/Phm";
import { User } from "../entity/User";
import { Mother } from "../entity/Mother";

export class MohController {
  private mohRepository = AppDataSource.getRepository(Moh);
  private userRepository = AppDataSource.getRepository(User);
  private motherRepository = AppDataSource.getRepository(Mother);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.mohRepository.find({ relations: ["user"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({ where: { id } });

    const moh = await this.mohRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    if (!moh) {
      return "unlisted moh";
    }
    return moh;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { phone_number, moh_id, nic, mother_count, baby_count } =
      request.body;

    if (request.user.userRole !== "moh") {
      console.log(request.user.role);
      return "You are not authorized to create a MOH";
    }

    const userId = request.user?.userId;

    if (!userId) {
      return response
        .status(400)
        .json({ error: "User ID is missing or invalid" });
    }

    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      return response
        .status(400)
        .json({ error: "User ID is not a valid number" });
    }

    const user = await this.userRepository.findOne({
      where: { id: parsedUserId }, // Use the correct property name here
    });

    if (!user) {
      return response.status(404).json({ error: "User not found" });
    }

    const moh = Object.assign(new Moh(), {
      phone_number,
      moh_id,
      nic,
      mother_count,
      baby_count,
      user: user,
    });

    return this.mohRepository.save(moh);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let mohToRemove = await this.mohRepository.findOneBy({ id });

    if (!mohToRemove) {
      return "this MOH not exist";
    }

    await this.mohRepository.remove(mohToRemove);

    return "MOH has been removed";
  }
  //----------------------------------------------------------------------
  // async addMother(request: Request, response: Response, next: NextFunction) {
  //   const userId = request.user?.userId;

  //   const parsedUserId = parseInt(userId, 10);

  //   const user = await this.userRepository.findOne({
  //     where: { id: parsedUserId },
  //   });

  //   const phm = await this.phmRepository.findOne({
  //     where: { user },
  //     relations: ["user"],
  //   });

  //   const motherId = request.body.motherID; // ID of the mother to be added

  //   const mother = await this.motherRepository.findOne({
  //     where: { id: motherId },
  //   });

  //   console.log("ad mother: " + mother.age);

  //   if (!phm) {
  //     return response.status(404).json({ error: "PHM not found" });
  //   }

  //   if (!mother) {
  //     return response.status(404).json({ error: "Mother not found" });
  //   }

  //   mother.phm = phm; // Assign the mother to the PHM
  //   return this.motherRepository.save(mother);

  //   // return response
  //   //   .status(200)
  //   //   .json({ message: "Mother added to PHM successfully" });
  // }
}
