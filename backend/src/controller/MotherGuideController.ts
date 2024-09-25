import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { MotherGuide } from "../entity/MotherGuide";

export class MotherGuideController {
  private motherGuideRepository = AppDataSource.getRepository(MotherGuide);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.motherGuideRepository.find({
      where: { deletedAt: null }, // Fetch only non-deleted records
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const guide = await this.motherGuideRepository.findOne({
      where: { id, deletedAt: null }, // Ensure it's not soft-deleted
    });

    if (!guide) {
      return "unlisted or deleted guide";
    }
    return guide;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { title, subtitle, message } = request.body;

    const guide = Object.assign(new MotherGuide(), {
      title,
      subtitle,
      message,
    });

    return this.motherGuideRepository.save(guide);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let guideToRemove = await this.motherGuideRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!guideToRemove) {
      return "this guide does not exist or is already deleted";
    }

    guideToRemove.deletedAt = new Date(); // Set the deletedAt timestamp
    await this.motherGuideRepository.save(guideToRemove);

    return "guide has been soft deleted";
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { title, subtitle, message } = request.body;

    // Fetch the guide to update, making sure it’s not soft-deleted
    let guideToUpdate = await this.motherGuideRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!guideToUpdate) {
      return "this guide does not exist or is already deleted";
    }

    // Update the fields
    guideToUpdate.title = title;
    guideToUpdate.subtitle = subtitle;
    guideToUpdate.message = message;

    // Save the updated guide
    await this.motherGuideRepository.save(guideToUpdate);

    return "guide has been updated";
  }
}
