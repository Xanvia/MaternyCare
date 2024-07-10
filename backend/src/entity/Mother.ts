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

  @Column({ type: 'varchar', length: 255 })
  allergies: string;

  @Column({ type: 'varchar', length: 255 })
  phm_area: string;

  @Column({ type: 'varchar', length: 255 })
  moh_area: string;

  @Column({ type: 'varchar', length: 255 })
  field_clinic: string;

  @Column({ type: 'varchar', length: 255 })
  hospital_clinic: string;

  @Column({ type: 'varchar', length: 255 })
  consultant_obstetrician: string;

  @Column({ type: 'varchar', length: 255 })
  antenatal_risk_conditions: string;

  @Column({ type: 'varchar', length: 255 })
  eligible_family_register: string;

  @Column({ type: 'varchar', length: 255 })
  pregnant_mother_register: string;

  @Column({ type: 'boolean' })
  consanguinity: boolean;

  @Column({ type: 'boolean' })
  rubella_immunization: boolean;

  @Column({ type: 'boolean' })
  pre_pregnancy_screening: boolean;

  @Column({ type: 'boolean' })
  preconceptional_folic_acid: boolean;

  @Column({ type: 'boolean' })
  history_of_subfertility: boolean;

  @Column({ type: 'boolean' })
  planned_pregnancy: boolean;

  @Column({ type: 'varchar', length: 255 })
  last_family_planing_method: string;

  @Column({ type: 'int' })
  gravidity: number;

  @Column({ type: 'int' })
  age_of_youngest_child: number;

  @Column({ type: 'date' })
  LRMP: Date;

  @Column({ type: 'date' })
  EDD: Date;

  @Column({ type: 'date' })
  US_corrected_EDD: Date;

  @Column({ type: 'varchar', length: 255 })
  POA_at_dating_scan: string;

  @Column({ type: 'date' })
  date_of_quickening: Date;

  @Column({ type: 'varchar', length: 255 })
  POA_at_registration: string;

  @Column({ type: 'varchar', length: 255 })
  Respiratory_system: string;

  @Column({ type: 'varchar', length: 255 })
  Breast_examination: string;

  @Column({ type: 'varchar', length: 255 })
  Anthelmintic_drugs: string;

  @Column({ type: 'date' })
  Date_of_issuing_kick_count_chart: Date;

  @Column({ type: 'date' })
  Date_of_taking_blood_sample_for_HIV_screening: Date;

  @Column({ type: 'date' })
  Date_of_result_informed_to_mother: Date;

  @OneToMany(() => Appointment, (appointment) => appointment.mother)
  appointments: Appointment[];

  @OneToMany(() => Feedback, (feedback) => feedback.mother)
  feedbacks: Feedback[];

  @OneToOne(() => User, (user) => user.mother)
  @JoinColumn()
  user: User;
}
