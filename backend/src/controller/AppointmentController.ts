import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User } from "../entity/User";
import { generateAppointmentsForMother } from "../service/mothreAppointmentGenerater";
import { DataSource } from "typeorm";
import { Appointment } from "../entity/Appointment";
import { error } from "console";

export class AppointmentController {
  private appointmentRepository = AppDataSource.getRepository(Appointment);
  private motherRepository = AppDataSource.getRepository(Mother);
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.appointmentRepository.find({ 
      relations: 
        ["mother"] 
    })
  }

  //get one appointment by id
  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({where:{id}});

    const mother = await this.motherRepository.findOne({
      where:{user},
      relations:["user",]
    });

    const appointment = await this.appointmentRepository.findOne({
      where: { mother },
      relations:["mother"],
    });

    if(!appointment){
      return "No appointment found";
    }
    return appointment;
  }

  async save(request: Request, response: Response, next: NextFunction){
    const{id, appointment_type, startDate, endDate, month, deletedAt, checkedByMother, checkedByPHM} = request.body;

    const motherId = request.user?.motherId;

    if(!motherId){
      return response
        .status(400)
        .json({error: "Mother Id is missing or invalid"});
    }

   try{
    const mother = await this.motherRepository.findOne({where: {id: motherId}});
    if(!mother){
      return response.status(404).json({message:"Mother not found"});
    }
    const appointment = new Appointment();
    appointment.id = id;
    appointment.appointment_type = appointment_type;
    appointment.startDate = startDate;
    appointment.endDate = endDate;
    appointment.month = month;
    appointment.deletedAt = deletedAt;
    appointment.checkedByMother = checkedByMother;
    appointment.checkedByPHM = checkedByPHM;

    await this.appointmentRepository.save(appointment);
    
    response.send(appointment);
    return;

   }catch(error){
    return next(error);
   }

  }
}
