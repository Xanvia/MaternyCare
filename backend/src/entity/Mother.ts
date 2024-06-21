import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { Appointment } from "./Appointment";

@Entity()
export class Mother {
  @PrimaryGeneratedColumn()
  id: number;

  // other fields...

  @OneToMany(() => Appointment, (appointment) => appointment.mother)
  appointments: Appointment[];
}
