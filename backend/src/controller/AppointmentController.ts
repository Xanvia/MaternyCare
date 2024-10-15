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

    // const user = await this.userRepository.findOne({where:{id}});

    // const mother = await this.motherRepository.findOne({
    //   where:{user},
    //   relations:["user",]
    // });

    const appointment = await this.appointmentRepository.findOne({
      where: { id },
      relations:["mother"],
    });

    if(!appointment){
      return "No appointment found";
    }
    return appointment;
  }

  async save(request: Request, response: Response, next: NextFunction){
    const{appointment_type, startDate, endDate, month, deletedAt, checkedByMother, checkedByPHM} = request.body;

    const userId = request.user?.userId;

    const user = await this.userRepository.findOne({where: { id : userId}});

    const mother = await this.motherRepository.findOne({ 
      where: { user }, 
      relations: ["user"],
  });
    
    console.log("userIdcdf"+userId+" mother"+mother.id);
    
    if(!mother.id){
      return response
        .status(400)
        .json({error: "Mother Id is missing or invalid"});
    }

   try{
    //const mother = await this.motherRepository.findOne({where: { id : }});
    // if(!mother){
    //   return response.status(404).json({message:"user not found"});
    // }
    const appointment = new Appointment();
    appointment.appointment_type = appointment_type;
    appointment.startDate = startDate;
    appointment.endDate = endDate;
    appointment.month = month;
    appointment.deletedAt = deletedAt;
    appointment.checkedByMother = checkedByMother;
    appointment.checkedByPHM = checkedByPHM;
    appointment.mother = mother;

    await this.appointmentRepository.save(appointment);
    
    response.send(appointment);
    return;

   }catch(error){
    return next(error);
   }

  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let appointmentToRemove = await this.appointmentRepository.findOneBy({ id });

    if (!appointmentToRemove) {
      return "this appointment not exist";
    }

    await this.appointmentRepository.remove(appointmentToRemove);

    return "appointment has been removed";
  }

  
}
