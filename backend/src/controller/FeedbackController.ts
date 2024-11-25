import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Notice } from "../entity/Notice";
import { Feedback } from "../entity/Feedback";
import { User } from "../entity/User";
import { Mother } from "../entity/Mother";
import { Phm } from "../entity/Phm";
import { Appointment } from "../entity/Appointment";


export class FeedbackController {
  private feedbackRepository = AppDataSource.getRepository(Feedback);
  private userRepository = AppDataSource.getRepository(User);
  private motherRepository = AppDataSource.getRepository(Mother);
  private phmRepository = AppDataSource.getRepository(Phm);
  private appointmentRepository = AppDataSource.getRepository(Appointment);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.feedbackRepository.find({
      relations: ["phm", "mother", "appointment"],
      where: { deletedAt: null }, // Fetch only non-deleted records
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const feedback = await this.feedbackRepository.findOne({
      where: { id, deletedAt: null }, // Ensure it's not soft-deleted
    });

    if (!feedback) {
      return "unlisted or deleted notice";
    }
    return feedback;
  }

  // async save(request: Request, response: Response, next: NextFunction) {
  //   const { feedback_content} = request.body;
  
  //   const userId = request.user?.userId;
  
  //   // Find the user and associated mother
  //   const user = await this.userRepository.findOne({ where: { id: userId } });
  //   const mother = await this.motherRepository.findOne({
  //     where: { user },
  //     relations: ["user"],
  //   });
  
  //   if (!mother) {
  //     return response
  //       .status(400)
  //       .json({ error: "Mother Id is missing or invalid" });
  //   }
  
  //   // Optionally, find the associated PHM
  //   const phm = await this.phmRepository.findOne({ where: { user } });
  
  //   // Optionally, find the associated appointment
  //   let appointment = null;
  //   if (appointmentId) {
  //     appointment = await this.appointmentRepository.findOne({
  //       where: { id: appointmentId },
  //     });
  
  //     if (!appointment) {
  //       return response
  //         .status(400)
  //         .json({ error: "Invalid appointment ID provided" });
  //     }
  //   }
  
  //   try {
  //     // Create and populate the feedback object
  //     const feedback = new Feedback();
  //     feedback.feedback_content = feedback_content;
  //     feedback.mother = mother;
  //     feedback.phm = phm || null; // Optional PHM association
  //     feedback.appointment = appointment || null; // Optional appointment association
  
  //     // Save the feedback entity
  //     await this.feedbackRepository.save(feedback);
  
  //     response.send(feedback);
  //     return;
  //   } catch (error) {
  //     return next(error);
  //   }
  // }
  


 
  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let feedbackToRemove = await this.feedbackRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!feedbackToRemove) {
      return "this feedback does not exist or is already deleted";
    }

    feedbackToRemove.deletedAt = new Date(); // Set the deletedAt timestamp
    await this.feedbackRepository.save(feedbackToRemove);

    return "feedback has been soft deleted";
  }

  // async update(request: Request, response: Response, next: NextFunction) {
  //   const id = parseInt(request.params.id);
  //   const { title, subtitle, message } = request.body;

  //   // Fetch the notice to update, making sure it’s not soft-deleted
  //   let noticeToUpdate = await this.noticeRepository.findOne({
  //     where: { id, deletedAt: null },
  //   });

  //   if (!noticeToUpdate) {
  //     return "this notice does not exist or is already deleted";
  //   }

  //   // Update the fields
  //   noticeToUpdate.title = title;
  //   noticeToUpdate.subtitle = subtitle;
  //   noticeToUpdate.message = message;

  //   // Save the updated notice
  //   await this.noticeRepository.save(noticeToUpdate);

  //   return "notice has been updated";
  // }
}
