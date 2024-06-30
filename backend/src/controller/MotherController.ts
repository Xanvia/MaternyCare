import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";

export class MotherController {
  private motherRepository = AppDataSource.getRepository(Mother);

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
    const { title, subtitle, message } = request.body;

    const mother = Object.assign(new Mother(), {
      title,
      subtitle,
      message,
    });

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
