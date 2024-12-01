import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Moh } from "../entity/Moh";
import { Phm } from "../entity/Phm";
import { User } from "../entity/User";
import { Mother } from "../entity/Mother";

export class MohController {
  private mohRepository = AppDataSource.getRepository(Moh);
  private userRepository = AppDataSource.getRepository(User);
  private phmRepository = AppDataSource.getRepository(Phm);
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

  async updateMohPersonalInfo(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, email, phoneNumber, NIC, mohID, mohArea } =
      request.body;

    const userId = request.user?.userId;

    try {
      const moh = await this.mohRepository.findOne({
        where: { id },
        relations: ["user"],
      });

      if (!moh) {
        return response.status(404).json({ message: "Moh not found" });
      }

      // Update the moh's details
      moh.user.firstName = firstName ?? moh.user.firstName;
      moh.user.lastName = lastName ?? moh.user.lastName;
      moh.user.email = email ?? moh.user.email;
      moh.NIC = NIC ?? moh.NIC;
      moh.mohArea = mohArea ?? moh.mohArea;
      moh.phoneNumber = phoneNumber ?? moh.phoneNumber;
      moh.mohID = mohID ?? moh.mohID;

      // console.log("phm ", userId);
      // if (userId) {
      //   const user = await this.userRepository.findOne({
      //     where: { id: userId },
      //   });
      //   const phm = await this.phmRepository.findOne({
      //     where: { user },
      //     relations: ["user"],
      //   });
      //   if (!phm) {
      //     return response.status(404).json({ message: "PHM not found" });
      //   }
      //   moh.phm = phm; // Update the PHM relationship
      // }

      await this.mohRepository.save(moh);
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

  async addPhm(request: Request, response: Response, next: NextFunction) {
    const userId = request.user?.userId;
    const parsedUserId = parseInt(userId, 10);

    const user = await this.userRepository.findOne({
      where: { id: parsedUserId },
    });

    const moh = await this.mohRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    const phmId = request.body.phmID; // ID of the phm to be added

    const phm = await this.phmRepository.findOne({
      where: { id: phmId },
    });

    console.log("ad phm: " + phm.id);

    // if (!phm) {
    //   return response.status(404).json({ error: "PHM not found" });
    // }

    // if (!mother) {
    //   return response.status(404).json({ error: "Mother not found" });
    // }

    phm.moh = moh; // Assign the phm to the MOH
    return this.phmRepository.save(phm);

    // return response
    //   .status(200)
    //   .json({ message: "Mother added to PHM successfully" });
  }
}
