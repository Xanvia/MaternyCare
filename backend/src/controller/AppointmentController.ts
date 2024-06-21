import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Appointment } from "../entity/Appointment";

export class NoticeController {
  private noticeRepository = AppDataSource.getRepository(Appointment);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.noticeRepository.find();
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const appointment = await this.noticeRepository.findOne({
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

    return this.noticeRepository.save(appointment);
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let appointmentToRemove = await this.noticeRepository.findOneBy({ id });

    if (!appointmentToRemove) {
      return "this appointment not exist";
    }

    await this.noticeRepository.remove(appointmentToRemove);

    return "appointment has been removed";
  }
}
