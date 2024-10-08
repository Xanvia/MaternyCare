import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Phm } from "../entity/Phm";
import { User } from "../entity/User";

export class PhmController {
  private phmRepository = AppDataSource.getRepository(Phm);
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.phmRepository.find({ relations: ["user"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({ where: { id } });

    const phm = await this.phmRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    if (!phm) {
      return "unlisted phm";
    }
    return phm;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { phone_number, phm_id, nic, mother_count, baby_count, star_points } =
      request.body;

    if (request.user.userRole !== "phm") {
      console.log(request.user.role);
      return "You are not authorized to create a PHM";
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

    const phm = Object.assign(new Phm(), {
      phone_number,
      phm_id,
      nic,
      mother_count,
      baby_count,
      star_points,
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
}
