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
export class Moh {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: number;

  @Column()
  mohId: string;

  @Column()
  nic: string;

  @Column()
  mohArea: string;

  @Column({ default: false })
  isVisited: boolean;

  @Column()
  motherCount: number;

  @Column()
  babyCount: number;

  @Column()
  starPoints: number;

  @OneToMany(() => Appointment, (appointment) => appointment.moh)
  appointments: Appointment[];

  @OneToOne(() => User, (user) => user.moh)
  @JoinColumn()
  user: User;
}
