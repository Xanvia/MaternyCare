import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity()
export class Phm {
  @PrimaryGeneratedColumn()
  id: number;

  // other fields...

  @OneToMany(() => Appointment, (appointment) => appointment.phm)
  appointments: Appointment[];
}
