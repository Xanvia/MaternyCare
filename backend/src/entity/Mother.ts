import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { User } from "./User";

@Entity()
export class Mother {
  @PrimaryGeneratedColumn()
  id: number;

  // other fields...

  @OneToMany(() => Appointment, (appointment) => appointment.mother)
  appointments: Appointment[];

  @OneToOne(() => User, (user) => user.mother)
  @JoinColumn()
  user: User;
}
