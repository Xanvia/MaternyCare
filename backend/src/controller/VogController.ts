import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Vog } from "../entity/Vog";
import { Phm } from "../entity/Phm";
import { User } from "../entity/User";
import { Mother } from "../entity/Mother";

export class VogController {
  private vogRepository = AppDataSource.getRepository(Vog);
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.vogRepository.find({ relations: ["user"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({ where: { id } });

    const vog = await this.vogRepository.findOne({
      where: { user },
      relations: ["user"],
    });
    if (!vog) {
      return "unlisted vog";
    }
    return vog;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { vogArea, phoneNumber, vogID } = request.body;

    if (request.user.userRole !== "vog") {
      console.log(request.user.userRole);
      return response
        .status(403)
        .json({ message: "You are not authorized to create a Vog" });
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

      const vog = new Vog();
      vog.phoneNumber = phoneNumber;
      vog.vogID = vogID;
      vog.user = user; // Linking the User entity
      await this.vogRepository.save(vog);

      response.send(vog);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updateVogPersonalInfo(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, email, phoneNumber, NIC, vogID, vogArea } =
      request.body;

    const userId = request.user?.userId;

    try {
      const vog = await this.vogRepository.findOne({
        where: { id },
        relations: ["user"],
      });

      if (!vog) {
        return response.status(404).json({ message: "Vog not found" });
      }

      // Update the vog's details
      vog.user.firstName = firstName ?? vog.user.firstName;
      vog.user.lastName = lastName ?? vog.user.lastName;
      vog.user.email = email ?? vog.user.email;
      vog.phoneNumber = phoneNumber ?? vog.phoneNumber;
      vog.vogID = vogID ?? vog.vogID;

      await this.vogRepository.save(vog);
      response.send(vog);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let vogToRemove = await this.vogRepository.findOneBy({ id });

    if (!vogToRemove) {
      return "this VOG not exist";
    }

    await this.vogRepository.remove(vogToRemove);

    return "VOG has been removed";
  }
}
