import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  CreateDateColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { User } from "./User";
import { Feedback } from "./Feedback";


@Entity()
export class Mother {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  phmId: number;

  @Column({ type: 'int' })
  mohId: number;

  @Column({ type: 'int' })
  age: number;

  @Column({ type: 'varchar', length: 255 })
  bio: string;

  @Column({ type: 'numeric' })
  phone_1: number;

  @Column({ type: 'numeric' })
  phone_2: number;

  @Column({ type: 'varchar', length: 20 })
  nic: string;

  @Column({ type: 'varchar', length: 255 })
  location: string;

  @Column({ type: 'date' })
  dob: Date;

  @Column({ type: 'varchar', length: 50 })
  hospital_id: string;

  @Column({ type: 'boolean' })
  isVerified: boolean;

  @Column({ type: 'int' })
  fetal_age: number;

  @Column({ type: 'int' })
  baby_count: number;

  @Column({ type: 'boolean' })
  isDelivered: boolean;

  @Column({ type: 'int' })
  fetal_heart_rate: number;

  @Column({ type: 'int', array: true })
  kick_count: number[];

  @CreateDateColumn({ type: 'timestamp' })
  time_stamp: Date;

  @Column({ type: 'int' })
  baby_weight: number;

  @Column({ type: 'int' })
  baby_height: number;

  @Column({ type: 'int' })
  mother_weight: number;

  @Column({ type: 'int' })
  mother_height: number;

  @Column({ type: 'int', array: true })
  appointment: number[];

  @Column({ type: 'text' })
  mother_blood_type: string;

  @Column({ type: 'enum', enum: ['red', 'blue'] })
  risk_type: 'red' | 'blue';

  @Column({ type: 'date' })
  delivery_date: Date;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  baby_gender: 'male' | 'female';


  @OneToMany(() => Appointment, (appointment) => appointment.mother)
  appointments: Appointment[];

  @OneToMany(() => Feedback, (feedback) => feedback.mother)
  feedbacks: Feedback[];

  @OneToOne(() => User, (user) => user.mother)
  @JoinColumn()
  user: User;
}
