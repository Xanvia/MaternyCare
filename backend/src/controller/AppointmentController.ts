import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Appointment } from "../entity/Appointment";

export class AppointmentController {
  private appointmentRepository = AppDataSource.getRepository(Appointment);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.appointmentRepository.find({
      where: { deletedAt: null }, // Fetch only non-deleted records
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const appointment = await this.appointmentRepository.findOne({
      where: { id, deletedAt: null }, // Ensure it's not soft-deleted
    });

    if (!appointment) {
      return "unlisted or deleted appointment";
    }
    return appointment;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { appointment_type, endDate, startDate, month } = request.body;

    const appointment = Object.assign(new Appointment(), {
      appointment_type,
      endDate,
      startDate,
      month,
    });

    return this.appointmentRepository.save(appointment);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let appointmentToRemove = await this.appointmentRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!appointmentToRemove) {
      return "this appoinment does not exist or is already deleted";
    }

    appointmentToRemove.deletedAt = new Date(); // Set the deletedAt timestamp
    await this.appointmentRepository.save(appointmentToRemove);

    return "appointment has been soft deleted";
  }

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { appointment_type, startDate, endDate, month } = request.body;

    // Fetch the notice to update, making sure it’s not soft-deleted
    let appointmentToUpdate = await this.appointmentRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!appointmentToUpdate) {
      return "this appoinment does not exist or is already deleted";
    }

    // Update the fields
    appointmentToUpdate.appointment_type = appointment_type;
    appointmentToUpdate.startDate = startDate;
    appointmentToUpdate.endDate = endDate;
    appointmentToUpdate.month = month;

    // Save the updated notice
    await this.appointmentRepository.save(appointmentToUpdate);

    return "appointment has been updated";
  }
}
