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
      relations: ["mother"],
    });
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
      relations: ["mother"],
    });

    if (!appointment) {
      return "No appointment found";
    }
    return appointment;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const {
      appointment_type,
      startDate,
      endDate,
      month,
      deletedAt,
      checkedByMother,
      checkedByPHM,
    } = request.body;

    const userId = request.user?.userId;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const mother = await this.motherRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    console.log("userIdcdf" + userId + " mother" + mother.id);

    if (!mother.id) {
      return response
        .status(400)
        .json({ error: "Mother Id is missing or invalid" });
    }

    try {
      
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
    } catch (error) {
      return next(error);
    }
  }

  async getMotherAppoinments(request: Request, response: Response, next: NextFunction){

    const userId = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id:userId },
    });

    const mother = await this.motherRepository.findOne({
      where: { user: {id:userId} },
    });



    // const motherId = parseInt(request.params.id);
   
    // const mother = await this.motherRepository.findOne({
    //   where: { id: motherId },
    // });
    
    const appointments = await this.appointmentRepository.find({
      where: { mother: { id: mother.id } },
      relations: ["mother"],
    });
    
     return appointments;
  }

  // async generateAppointment(request: Request, response: Response, next: NextFunction) {
    
  //   const {
  //     appointment_type,
  //     startDate,
  //     endDate,
  //     month,
  //     deletedAt,
  //     checkedByMother,
  //     checkedByPHM,
  //   } = request.body;

  //   const userId = request.user?.userId;

  //   const user = await this.userRepository.findOne({ where: { id: userId } });

  //   const mother = await this.motherRepository.findOne({
  //     where: { user },
  //     relations: ["user"],
  //   });

  //   if (!mother || !mother.delivery_date) {
  //     throw new Error("Mother or delivery date not found");
  //   }

  //   console.log("userIdcdf" + userId + " mother" + mother.id);

  //   if (!mother.id) {
  //     return response
  //       .status(400)
  //       .json({ error: "Mother Id is missing or invalid" });
  //   }

  //   try {
      
  //     const appointment = new Appointment();
  //     appointment.appointment_type = appointment_type;
  //     appointment.startDate = startDate;
  //     appointment.endDate = endDate;
  //     appointment.month = month;
  //     appointment.deletedAt = deletedAt;
  //     appointment.checkedByMother = checkedByMother;
  //     appointment.checkedByPHM = checkedByPHM;
  //     appointment.mother = mother;

  //     await this.appointmentRepository.save(appointment);

  //     response.send(appointment);
  //     return;
  //   } catch (error) {
  //     return next(error);
  //   }
  // }

  async generateAppointment(request: Request, response: Response, next: NextFunction) {
    const {
      appointment_type,
      month,
      deletedAt,
      checkedByMother,
      checkedByPHM,
    } = request.body;
  
    const userId = request.user?.userId;
  
    const user = await this.userRepository.findOne({ where: { id: userId } });
  
    const mother = await this.motherRepository.findOne({
      where: { user },
      relations: ["user"],
    });
  
    if (!mother || !mother.delivery_date) {
      return response.status(400).json({ error: "Mother or delivery date not found" });
    }
  
    try {
      const deliveryDate = new Date(mother.delivery_date); // Mother's delivery date
      const appointments = [];
  
      // Generate 10 appointments, spaced 1 week apart
      for (let i = 0; i < 10; i++) {
        const startDate = new Date(deliveryDate);
        startDate.setDate(startDate.getDate() - i * 30); // 1 week interval
  
        const endDate = new Date(startDate); // Assuming startDate and endDate are the same
  
        const newAppointment = new Appointment();
        newAppointment.appointment_type = appointment_type || "Check-up"; // Default to "Check-up" if not provided
        newAppointment.startDate = startDate; // Format as YYYY-MM-DD
        newAppointment.endDate = endDate;
        newAppointment.month = month;
        newAppointment.deletedAt = deletedAt;
        newAppointment.checkedByMother = checkedByMother;
        newAppointment.checkedByPHM = checkedByPHM;
        newAppointment.mother = mother;
  
        appointments.push(newAppointment);
      }
  
      // Save all generated appointments in bulk
      await this.appointmentRepository.save(appointments);
  
      response.status(201).json(appointments); // Return the generated appointments
    } catch (error) {
      return next(error);
    }
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
