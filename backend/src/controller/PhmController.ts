import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Phm } from "../entity/Phm";
import { User } from "../entity/User";
import { Mother } from "../entity/Mother";

export class PhmController {
  private phmRepository = AppDataSource.getRepository(Phm);
  private userRepository = AppDataSource.getRepository(User);
  private motherRepository = AppDataSource.getRepository(Mother);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.phmRepository.find({ relations: ["user"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({ where: { id } });

    const phm = await this.phmRepository.findOne({
      where: { user },
      relations: ["user", "moh"],
    });

    if (!phm) {
      return "unlisted phm";
    }
    return phm;
  }

  async getByMother(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    // const userId = request.user?.userId;

    // const user = await this.userRepository.findOne({
    //   where: { id: userId },
    // });

    console.log("mother: " + id);
    try {
      // Find the mother by ID
      const mother = await this.motherRepository.findOne({
        where: { id },
        relations: ["phm"], // Include the related PHM entity
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Access the related PHM
      const phm = await this.phmRepository.findOne({
        where: { id: mother.phm.id },
        relations: ["user"], // Include the related user entity
      });

      if (!phm) {
        return { message: "PHM not found" };
      }

      // Return the required details
      const result = {
        firstName: phm.user.firstName,
        email: phm.user.email,
        phoneNumber: phm.phone_number,
      };

      return { result };
    } catch (error) {
      console.error("Error fetching PHM by mother ID:", error);
      return { message: "Internal server error" };
    }
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { phone_number, phm_id, nic, phm_area, moh_division } = request.body;

    if (request.user.userRole !== "phm") {
      console.log(request.user.role);
      return "You are not authorized to create a PHM";
    }

    const userId = request.user?.userId;

    if (!userId) {
      return { error: "User ID is missing or invalid" };
    }

    const parsedUserId = parseInt(userId, 10);

    if (isNaN(parsedUserId)) {
      return { error: "User ID is not a valid number" };
    }

    const user = await this.userRepository.findOne({
      where: { id: parsedUserId }, // Use the correct property name here
    });

    if (!user) {
      return { error: "User not found" };
    }

    const phm = Object.assign(new Phm(), {
      phone_number,
      phm_id,
      nic,
      phm_area,
      moh_division,
      user: user,
    });

    return this.phmRepository.save(phm);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let phmToRemove = await this.phmRepository.findOneBy({ id });

    if (!phmToRemove) {
      return "this phm not exist";
    }

    await this.phmRepository.remove(phmToRemove);

    return "phm has been removed";
  }

  async addMother(request: Request, response: Response, next: NextFunction) {
    const userId = request.user?.userId;

    const parsedUserId = parseInt(userId, 10);

    const user = await this.userRepository.findOne({
      where: { id: parsedUserId },
    });

    const phm = await this.phmRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    const motherId = request.body.motherID; // ID of the mother to be added

    const mother = await this.motherRepository.findOne({
      where: { id: motherId },
      relations: ["user"], // Ensure the user relationship is populated
    });

    if (!phm) {
      return { error: "PHM not found" };
    }

    if (!mother) {
      return { error: "Mother not found" };
    }

    mother.phm = phm; // Assign the mother to the PHM
    mother.user.isVerified = true; // Mark the mother as verified
    console.log("mother veifiy ", mother.user.isVerified);
    await this.motherRepository.save(mother);

    return { message: "Mother added to PHM successfully" };
  }
}
