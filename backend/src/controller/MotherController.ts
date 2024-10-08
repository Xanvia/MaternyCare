import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User } from "../entity/User";

export class MotherController {
  private motherRepository = AppDataSource.getRepository(Mother);
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.motherRepository.find({ relations: ["user"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({ where: { id } });

    const mother = await this.motherRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    if (!mother) {
      return "unlisted mother";
    }
    return mother;
  }

  // async one(request: Request, response: Response, next: NextFunction) {
  //   const id = parseInt(request.params.id);

  //   try {
  //     const mother = await this.motherRepository.findOne({
  //       where: { id },
  //       relations: ["user"], // Include user-related data
  //     });

  //     if (!mother) {
  //       return response.status(404).json({ message: "Mother not found" });
  //     }
  //     return response.json(mother); // Use class-transformer to serialize
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  // async save(request: Request, response: Response, next: NextFunction) {
  //   const { age, nic, risk_type, phone_1, bio } = request.body;

  //   if (request.user.userRole !== "mother") {
  //     console.log(request.user.role);
  //     return "You are not authorized to create a Mother";
  //   }

  //   const userId = request.user?.userId;

  //   if (!userId) {
  //     return response
  //       .status(400)
  //       .json({ error: "User ID is missing or invalid" });
  //   }

  //   const parsedUserId = parseInt(userId, 10);

  //   if (isNaN(parsedUserId)) {
  //     return response
  //       .status(400)
  //       .json({ error: "User ID is not a valid number" });
  //   }

  //   const user = await this.userRepository.findOne({
  //     where: { id: parsedUserId }, // Use the correct property name here
  //   });

  //   if (!user) {
  //     return response.status(404).json({ error: "User not found" });
  //   }

  //   const mother = Object.assign(new Mother(), {
  //     age,
  //     nic,
  //     risk_type,
  //     phone_1,
  //     bio,
  //     user_id: user.id,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     role: user.role,
  //     isVerified: user.isVerified,
  //     password: user.password,
  //   });

  //   return this.motherRepository.save(mother);
  // }

  async save(request: Request, response: Response, next: NextFunction) {
    const { age, nic, risk_type, phone_1, bio, userId } = request.body;

    if (request.user.userRole !== "mother") {
      console.log(request.user.role);
      return response
        .status(403)
        .json({ message: "You are not authorized to create a Mother" });
    }

    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
      }

      // Check if a Mother entity already exists for the given userId
      const existingMother = await this.motherRepository.findOne({
        where: { user: { id: userId } },
      });
      if (existingMother) {
        return response
          .status(400)
          .json({ message: "Mother already exists for this user" });
      }

      const mother = new Mother();
      mother.age = age;
      mother.nic = nic;
      mother.risk_type = risk_type;
      mother.phone_1 = phone_1;
      mother.bio = bio;
      mother.user = user; // Set the user relationship

      await this.motherRepository.save(mother);
      return response.status(201).json(mother); // Directly return the mother entity
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
