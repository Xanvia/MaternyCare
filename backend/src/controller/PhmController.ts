import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Phm } from "../entity/Phm";

export class PhmController {
  private phmRepository = AppDataSource.getRepository(Phm);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.phmRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const phm = await this.phmRepository.findOne({
      where: { id },
    });

    if (!phm) {
      return "unlisted phm";
    }
    return phm;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {
      phone_number,
      phm_id,
      nic,
      mother_count,
      baby_count,
      star_points,
      isVerified,
    } = request.body;

    const phm = Object.assign(new Phm(), {
      phone_number,
      phm_id,
      nic,
      mother_count,
      baby_count,
      star_points,
      isVerified,
      user: request.user,
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
