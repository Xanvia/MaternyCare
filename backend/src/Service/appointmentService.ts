import { getRepository } from "typeorm";
import { addMonths, format } from 'date-fns'; // You can use date-fns for date manipulations
import { Mother } from "../entity/Mother";
import { Appointment } from "../entity/Appointment";

export const generateAppointmentsForMother = async (motherId: number) => {
  const motherRepo = getRepository(Mother);
  const appointmentRepo = getRepository(Appointment);

  const mother = await motherRepo.findOne({ where: { id: motherId }, relations: ['appointments'] });
  if (!mother || !mother.delivery_date) {
    throw new Error("Mother or delivery date not found");
  }

  const deliveryDate = new Date(mother.delivery_date);
  const startDate = addMonths(deliveryDate, -10); // 10 months before delivery date

  const appointmentType = 'Regular Check-up'; // Example type for each appointment
  const intervalDays = Math.floor((deliveryDate.getTime() - startDate.getTime()) / (10 * 24 * 60 * 60 * 1000)); // Divide into 10 parts

  const appointments: Appointment[] = [];
  
  for (let i = 0; i < 10; i++) {
    const appointmentStartDate = new Date(startDate);
    appointmentStartDate.setDate(appointmentStartDate.getDate() + i * intervalDays);

    const appointment = new Appointment();
    appointment.mother = mother;
    appointment.appointment_type = appointmentType;
    appointment.startDate = appointmentStartDate;
    appointment.endDate = appointmentStartDate; // Assuming one-day appointments
    appointment.month = format(appointmentStartDate, 'MMMM'); // Get the month name

    appointments.push(appointment);
  }

  await appointmentRepo.save(appointments);
  console.log(`10 appointments generated for mother ID: ${mother.id}`);
};
