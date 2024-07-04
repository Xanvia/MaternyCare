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

  @Column({ type: 'int' })
  phone_number: number;

  @Column({ type: 'int' })
  phm_id: number;

  @Column({ type: 'varchar', length: 255 })
  nic: string;

  @Column({ type: 'boolean' })
  isVisited: boolean;

  @Column({ type: 'int' })
  mother_count: number;

  @Column({ type: 'int' })
  baby_count: number;

  @Column({ type: 'int' })
  star_points: number;

  @Column({ type: 'boolean' })
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
