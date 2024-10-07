import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User } from "../entity/User";
import { generateAppointmentsForMother } from "../Service/appointmentService";

export class MotherController {
  private motherRepository = AppDataSource.getRepository(Mother);
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.motherRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const mother = await this.motherRepository.findOne({
      where: { id },
    });

    if (!mother) {
      return "unlisted mother";
    }
    return mother;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { age, nic, risk_type } = request.body;

    if (request.user.userRole !== "mother") {
      console.log(request.user.role);
      return "You are not authorized to create a Mother";
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

    const mother = Object.assign(new Mother(), {
      age,
      nic,
      risk_type,
      user_id: user.id,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      role: user.role,
      isVerified: user.isVerified,
      password: user.password,
    });

    const savedMother = await this.motherRepository.save(mother);

    if (savedMother.delivery_date) {
      await generateAppointmentsForMother(savedMother.id); // Call the function to generate appointments
    }

    return this.motherRepository.save(mother);
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
