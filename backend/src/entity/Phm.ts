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
import { FieldArea } from "./FieldArea";
import { Feedback } from "./Feedback";

@Entity()
export class Phm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  phone_number: number;

  @Column({ type: "int", nullable: true })
  phm_id: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  nic: string;

  @Column({ type: "int", nullable: true })
  mother_count: number;

  @Column({ type: "int", nullable: true })
  baby_count: number;

  @Column({ type: "int", nullable: true })
  star_points: number;

  @Column({ type: "boolean", nullable: true })
  isVerified: boolean;

  @OneToMany(() => Appointment, (appointment) => appointment.phm)
  appointments: Appointment[];

  @OneToMany(() => Feedback, (feedback) => feedback.phm)
  feedbacks: Feedback[];

  @OneToOne(() => User, (user) => user.phm)
  @JoinColumn()
  user: User;

  @OneToOne(() => FieldArea, (fielaArea) => fielaArea.id)
  @JoinColumn()
  fielaArea: FieldArea;
}
