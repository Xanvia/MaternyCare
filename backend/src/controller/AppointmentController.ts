import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User } from "../entity/User";
import { generateAppointmentsForMother } from "../service/mothreAppointmentGenerater";
import { DataSource, In } from "typeorm";
import { Appointment, AppointmentState } from "../entity/Appointment";
import { error } from "console";
import { Feedback } from "../entity/Feedback";
import { Phm } from "../entity/Phm";
import { getRepository } from "typeorm";

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
      feedback,
      appointment_description,
      appointment_state,
      deletedAt,
      checkedByMother,
      checkedByPHM,
      fixedDate,
    } = request.body;

    const userId = parseInt(request.params.userId);

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const mother = await this.motherRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    if (!mother.id) {
      return response
        .status(400)
        .json({ error: "Mother Id is missing or invalid" });
    }

    try {
      const appointment = new Appointment();
      appointment.appointment_description = appointment_description;
      appointment.fixedDate = fixedDate;
      appointment.deletedAt = deletedAt;
      appointment.checkedByMother = checkedByMother;
      appointment.checkedByPHM = checkedByPHM;
      appointment.feedback = feedback;
      appointment.appointment_state = appointment_state;
      appointment.mother = mother

      await this.appointmentRepository.save(appointment);

      response.send(appointment);
    } catch (error) {
      return next(error);
    }
  }

  async getMotherAppoinments(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userId = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const mother = await this.motherRepository.findOne({
      where: { user: { id: userId } },
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

  async getMotherAppoinmentsfromMotherId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const motherId = parseInt(request.params.id);

    const mother = await this.motherRepository.findOne({
      where: { id: motherId },
    });

    const appointments = await this.appointmentRepository.find({
      where: { mother: { id: mother.id } },
      relations: ["mother"],
    });

    return appointments;
  }


  async generateAppointment(request: Request, response: Response, next: NextFunction) {
  
    const userId = request.user?.userId;

    const user = await this.userRepository.findOne({ where: { id: userId } });

  
    const mother = await this.motherRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    if (!mother || !mother.delivery_date) {
      return response
        .status(400)
        .json({ error: "Mother or delivery date not found" });
    }

    try {
      const deliveryDate = new Date(mother.delivery_date); // Mother's delivery date
      const appointments = [];

      // Generate 10 appointments, spaced 1 week apart
      for (let i = 1; i < 10; i++) {
        const startDate = new Date(deliveryDate);
        startDate.setDate(startDate.getDate() - i * 30);

        const endDate = new Date(startDate); // Assuming startDate and endDate are the same

        const newAppointment = new Appointment();
        newAppointment.startDate = startDate; // Format as YYYY-MM-DD
        newAppointment.endDate = endDate;
        newAppointment.appointment_state = AppointmentState.PRENATAL; // Set appointment_type as prenatal
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

  async generatePostnatalAppointment(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userId = request.user?.userId;

    const user = await this.userRepository.findOne({ where: { id: userId } });

    const mother = await this.motherRepository.findOne({
      where: { user },
      relations: ["user"],
    });

    if (!mother || !mother.delivery_date) {
      return response
        .status(400)
        .json({ error: "Mother or delivery date not found" });
    }

    try {
      const deliveryDate = new Date(mother.delivery_date); // Mother's delivery date
      const appointments = [];

      // Generate 10 appointments, spaced 1 week apart
      for (let i = 0; i < 3; i++) {
        const startDate = new Date(deliveryDate);
        startDate.setDate(startDate.getDate() + i * 30);

        const endDate = new Date(startDate); // Assuming startDate and endDate are the same

        const newAppointment = new Appointment();
        newAppointment.startDate = startDate; // Format as YYYY-MM-DD
        newAppointment.endDate = endDate;
        newAppointment.mother = mother;
        newAppointment.appointment_state = AppointmentState.POSTNATAL;

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

  async update(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { 
      startDate, 
      endDate, 
      fixedDate, 
      Date_Of_Visited,
      month, 
      checkedByMother, 
      checkedByPHM, 
      appointment_description, 
      feedback,
      POA_weeks,
      POV_days,
      fm,
      fhs,
      urine,
      sugar,
      albumin,
      pallor,
      ankle,
      facial,
      blood_pressure,
      fundal_height,
      foetal_lie,
      presentation,
      engagement_of_the_presenting_part,
      iron,
      folate,
      calcium,
      vitamin_C,
      food_supplementation,
      signature_of_the_officer_examined,
      designation,
      weight,

    
    } = request.body;

    // Fetch the notice to update, making sure it’s not soft-deleted
    let appointmentToUpdate = await this.appointmentRepository.findOne({
      where: { id, deletedAt: null },
    });

    if (!appointmentToUpdate) {
      return "this notice does not exist or is already deleted";
    }

    // Update the fields
    appointmentToUpdate.startDate = startDate;
    appointmentToUpdate.endDate = endDate;
    appointmentToUpdate.fixedDate = fixedDate;
    appointmentToUpdate.Date_Of_Visited = Date_Of_Visited;
    appointmentToUpdate.month = month;
    appointmentToUpdate.checkedByPHM = checkedByPHM;
    appointmentToUpdate.checkedByMother = checkedByMother;
    appointmentToUpdate.appointment_description = appointment_description;
    appointmentToUpdate.feedback = feedback;
    appointmentToUpdate.POA_weeks = POA_weeks;
    appointmentToUpdate.POV_days = POV_days;
    appointmentToUpdate.fm = fm;
    appointmentToUpdate.fhs = fhs;
    appointmentToUpdate.urine = urine;
    appointmentToUpdate.sugar = sugar;
    appointmentToUpdate.albumin = albumin;
    appointmentToUpdate.pallor = pallor;
    appointmentToUpdate.ankle = ankle;
    appointmentToUpdate.facial = facial;
    appointmentToUpdate.blood_pressure = blood_pressure;
    appointmentToUpdate.fundal_height = fundal_height;
    appointmentToUpdate.foetal_lie = foetal_lie;
    appointmentToUpdate.presentation = presentation;
    appointmentToUpdate.engagement_of_the_presenting_part = engagement_of_the_presenting_part;
    appointmentToUpdate.iron = iron;
    appointmentToUpdate.folate = folate;
    appointmentToUpdate.calcium = calcium;
    appointmentToUpdate.vitamin_C = vitamin_C;
    appointmentToUpdate.food_supplementation = food_supplementation;
    appointmentToUpdate.signature_of_the_officer_examined = signature_of_the_officer_examined;
    appointmentToUpdate.designation = designation;
    appointmentToUpdate.weight = weight;


    // Save the updated notice
    await this.appointmentRepository.save(appointmentToUpdate);

    return "Appointment has been updated";
  }
}
