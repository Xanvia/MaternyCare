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
export class Phm {
  @PrimaryGeneratedColumn()
  id: number;

  // other fields...

  @OneToMany(() => Appointment, (appointment) => appointment.phm)
  appointments: Appointment[];

  @OneToOne(() => User, (user) => user.phm)
  @JoinColumn()
  user: User;
}
