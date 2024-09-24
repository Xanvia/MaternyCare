import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Appointment } from "../entity/Appointment";

export class AppointmentController {
  private appointmentRepository = AppDataSource.getRepository(Appointment);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.appointmentRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const appointment = await this.appointmentRepository.findOne({
      where: { id },
    });

    if (!appointment) {
      return "unlisted appointment";
    }
    return appointment;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { type, dateRange, checkedByMother, checkedByPHM, mother, phm } =
      request.body;

    const appointment = Object.assign(new Appointment(), {
      type,
      dateRange,
      checkedByMother,
      checkedByPHM,
      mother,
      phm,
    });

    return this.appointmentRepository.save(appointment);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let appointmentToRemove = await this.appointmentRepository.findOneBy({
      id,
    });

    if (!appointmentToRemove) {
      return "this appointment not exist";
    }

    await this.appointmentRepository.remove(appointmentToRemove);

    return "appointment has been removed";
  }
}
