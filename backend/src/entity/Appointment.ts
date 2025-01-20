import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
  OneToOne,
} from "typeorm";
import { Mother } from "./Mother";
import { Phm } from "./Phm";
import { Moh } from "./Moh";
import { Feedback } from "./Feedback";

export enum AppointmentState {
  PRENATAL = "prenatal",
  POSTNATAL = "postnatal",
}

export enum FM_FHS {
  POSITIVE = "+",
  NEGATIVE = "-",
}

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: "enum", // Specify the column type as enum
    enum: AppointmentState, // Use the defined enum
    nullable: true,
  })
  appointment_state: AppointmentState;

  @Column({
    type: "enum", // Specify the column type as enum
    enum: FM_FHS, // Use the defined enum
    nullable: true,
  })
  fm: FM_FHS;

  @Column({
    type: "enum", // Specify the column type as enum
    enum: FM_FHS, // Use the defined enum
    nullable: true,
  })
  fhs: FM_FHS;

  @Column({ nullable: true })
  appointment_description  : string;

  @Column({ nullable: true })
  feedback: string;

  @Column({ type: "date", nullable: true })
  startDate: Date; // Use Date type for startDate

  @Column({ type: "date", nullable: true })
  endDate: Date;

  @Column({ type: "date", nullable: true })
  fixedDate: Date;

  @Column({ type: "int", nullable: true })
  POA_weeks: number;

  @Column({ type: "int", nullable: true })
  POV_days: number;

  @Column({ nullable: true })
  unne: string;

  @Column({ nullable: true })
  sugar: string;

  @Column({ nullable: true })
  albumin: string;

  @Column({ nullable: true })
  pallor: string;

  @Column({ nullable: true })
  ankle: string;

  @Column({ nullable: true })
  facial: string;

  @Column({ type: "int", nullable: true })
  blood_pressure: number;

  @Column({ nullable: true })
  fundal_height: string;

  @Column({ nullable: true })
  foetal_lie: string;

  @Column({ nullable: true })
  presentation: string;

  @Column({ nullable: true })
  engagement_of_the_presenting_part: string;

  @Column({ type: "int", nullable: true })
  iron: number;

  @Column({ type: "int", nullable: true })
  folate: number;

  @Column({ type: "int", nullable: true })
  calcium: number;

  @Column({ type: "int", nullable: true })
  vitamin_C: number;

  @Column({ type: "int", nullable: true })
  food_supplementation: number;

  @Column({ nullable: true })
  signature_of_the_officer_examined: string;

  @Column({ nullable: true })
  designation: string;

  // @Column({ nullable: true })
  // month: string;

  @Column({ nullable: true })
  month: string;

  @BeforeInsert()
  @BeforeUpdate()
  updateMonth() {
    if (this.startDate) {
      const date = new Date(this.startDate);
      const month = date.toLocaleString("default", { month: "long" });
      this.month = month;

      const endDate = new Date(this.startDate);
      endDate.setDate(endDate.getDate() + 10);
      this.endDate = endDate;
    }
  }

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @Column({ default: false })
  checkedByMother: boolean;

  @Column({ default: false })
  checkedByPHM: boolean;

  @ManyToOne(() => Mother, (mother) => mother.appointments)
  mother: Mother;
  //appointment: Date;

  // @OneToOne(() => Feedback, (feedback) => feedback.appointment)
  // feedback: Feedback;

  // @ManyToOne(() => Phm, (phm) => phm.appointments)
  // phm: Phm;

  // @ManyToOne(() => Moh, (moh) => moh.appointments)
  // moh: Moh;
}
