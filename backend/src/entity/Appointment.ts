import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
} from "typeorm";
import { Mother } from "./Mother";
import { Phm } from "./Phm";
import { Moh } from "./Moh";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  appointment_type: string;

  @Column({ nullable: true })
  startDate: String; // PostgreSQL daterange type

  @Column({ nullable: true })
  endDate: String;

  @Column({ nullable: true })
  month: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  // @Column({ default: false })
  // checkedByMother: boolean;

  // @Column({ default: false })
  // checkedByPHM: boolean;

  // @ManyToOne(() => Mother, (mother) => mother.appointments)
  // mother: Mother;

  // @ManyToOne(() => Phm, (phm) => phm.appointments)
  // phm: Phm;

  // @ManyToOne(() => Moh, (moh) => moh.appointments)
  // moh: Moh;
}
