import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Moh } from "../entity/Moh";
import { Phm } from "../entity/Phm";
import { User } from "../entity/User";
import { Mother } from "../entity/Mother";

export class MohController {
  private mohRepository = AppDataSource.getRepository(Moh);
  private userRepository = AppDataSource.getRepository(User);
  // private motherRepository = AppDataSource.getRepository(Mother);s

  async all(request: Request, response: Response, next: NextFunction) {
    return this.mohRepository.find({ relations: ["user"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({ where: { id } });

    // console.log("middd, ", user);
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
    const { NIC, mohArea, phoneNumber, mohID } = request.body;

    if (request.user.userRole !== "moh") {
      console.log(request.user.userRole);
      // return "You are not authorized to create a MOH";
      return response
        .status(403)
        .json({ message: "You are not authorized to create a Moh" });
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

      const moh = new Moh();
      moh.NIC = NIC;
      moh.mohArea = mohArea;
      moh.phoneNumber = phoneNumber;
      moh.mohID = mohID;
      moh.user = user; // Linking the User entity
      await this.mohRepository.save(moh);

      await this.mohRepository.save(moh);
      // return response.status(201).json(mother);
      response.send(moh);
      return;
    } catch (error) {
      return next(error);
    }
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
}
