import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User } from "../entity/User";
import { generateAppointmentsForMother } from "../service/mothreAppointmentGenerater";
import { DataSource } from "typeorm";
import { Appointment } from "../entity/Appointment";

export class AppointmentController {
  private appointmentRepository = AppDataSource.getRepository(Appointment);
   

  async all(request: Request, response: Response, next: NextFunction) {
    return this.appointmentRepository.find({ 
      relations: 
        ["mother"] 
    })
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    //const appointment = await this.appointmentRepository.findOneById(id);

    const appointment = await this.appointmentRepository.findOne({
      where: { id }
    });
  }
}
