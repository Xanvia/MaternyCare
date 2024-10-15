import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  ManyToOne,
  JoinColumn,
  CreateDateColumn,
  OneToMany,
} from "typeorm";
import { User } from "./User";
<<<<<<< HEAD
<<<<<<< HEAD
import { Phm } from "./Phm";
=======
import { Appointment } from "./Appointment";
>>>>>>> 6c43cf7 (feat:Fix appointment controller issue)
=======
import { Appointment } from "./Appointment";
>>>>>>> 3e822c78ec434cfd129e23f1ef75f7787b39521e

@Entity()
export class Mother {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  age: number;

  @Column({ type: "varchar", length: 255, nullable: true })
  bio: string;

  @Column({ type: "numeric", nullable: true })
  phone_1: number;

  @Column({ type: "numeric", nullable: true })
  phone_2: number;

  @Column({ type: "varchar", length: 20, nullable: true })
  nic: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  location: string;

  @Column({ type: "date", nullable: true })
  dob: Date;

  @Column({ type: "varchar", length: 50, nullable: true })
  hospital_id: string;

  @Column({ type: "int", nullable: true })
  fetal_age: number;

  @Column({ type: "int", nullable: true })
  baby_count: number;

  @Column({ type: "boolean", nullable: true })
  isDelivered: boolean;

  @Column({ type: "int", nullable: true })
  fetal_heart_rate: number;

  @Column({ type: "int", array: true, nullable: true })
  kick_count: number[];

  @CreateDateColumn({ type: "timestamp", nullable: true })
  time_stamp: Date;

  @Column({ type: "int", nullable: true })
  baby_weight: number;

  @Column({ type: "int", nullable: true })
  baby_height: number;

  @Column({ type: "int", nullable: true })
  mother_weight: number;

  @Column({ type: "int", nullable: true })
  mother_height: number;

  @Column({ type: "int", array: true, nullable: true })
  appointment: number[];

  @Column({ type: "text", nullable: true })
  mother_blood_type: string;

  @Column({ type: "enum", enum: ["red", "blue"], nullable: true })
  risk_type: "red" | "blue";

  @Column({ type: "date", nullable: true })
  delivery_date: Date;

  @Column({ type: "enum", enum: ["male", "female"], nullable: true })
  baby_gender: "male" | "female";

  @Column({ type: "varchar", length: 255, nullable: true })
  allergies: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  phm_area: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  moh_area: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  field_clinic: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  hospital_clinic: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  consultant_obstetrician: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  antenatal_risk_conditions: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  eligible_family_register: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  pregnant_mother_register: string;

  @Column({ type: "boolean", nullable: true })
  consanguinity: boolean;

  @Column({ type: "boolean", nullable: true })
  rubella_immunization: boolean;

  @Column({ type: "boolean", nullable: true })
  pre_pregnancy_screening: boolean;

  @Column({ type: "boolean", nullable: true })
  preconceptional_folic_acid: boolean;

  @Column({ type: "boolean", nullable: true })
  history_of_subfertility: boolean;

  @Column({ type: "boolean", nullable: true })
  planned_pregnancy: boolean;

  @Column({ type: "varchar", length: 255, nullable: true })
  last_family_planing_method: string;

  @Column({ type: "int", nullable: true })
  gravidity: number;

  @Column({ type: "int", nullable: true })
  age_of_youngest_child: number;

  @Column({ type: "date", nullable: true })
  LRMP: Date;

  @Column({ type: "date", nullable: true })
  EDD: Date;

  @Column({ type: "date", nullable: true })
  US_corrected_EDD: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  POA_at_dating_scan: string;

  @Column({ type: "date", nullable: true })
  date_of_quickening: Date;

  @Column({ type: "varchar", length: 255, nullable: true })
  POA_at_registration: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Respiratory_system: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Breast_examination: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  Anthelmintic_drugs: string;

  @Column({ type: "date", nullable: true })
  Date_of_taking_blood_sample_for_HIV_screening: Date;

  @Column({ type: "date", nullable: true })
  Date_of_result_informed_to_mother: Date;

  @ManyToOne(() => Phm, (phm) => phm.mothers, {
    nullable: true,
    onDelete: "SET NULL", // When PHM is deleted, mothers can remain with no assigned PHM
  })
  phm: Phm;

  @OneToOne(() => User, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @OneToMany(() => Appointment, (appointment) => appointment.mother)
  appointments: Appointment[];
}
