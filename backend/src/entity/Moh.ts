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

  @Column({ nullable: true })
  phone: number;

  @Column({ nullable: true })
  mohId: string;

  @Column({ nullable: true })
  nic: string;

  @Column({ nullable: true })
  mohArea: string;

  @Column({ nullable: true })
  motherCount: number;

  @Column({ nullable: true })
  babyCount: number;

  @Column({ nullable: true })
  starPoints: number;

  // @OneToMany(() => Appointment, (appointment) => appointment.moh)
  // appointments: Appointment[];
}
