import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Mother } from "./Mother";
import { Phm } from "./Phm";
import { Moh } from "./Moh";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "enum", enum: ["prenatal", "postnatal"] })
  appointment_type: "prenatal" | "postnatal"; // Enum type for appointment

  @Column("daterange")
  dateRange: string; // PostgreSQL daterange type

  @Column({ default: false })
  checkedByMother: boolean;

  @Column({ default: false })
  checkedByPHM: boolean;

  // @ManyToOne(() => Mother, (mother) => mother.appointments)
  // mother: Mother;

  // @ManyToOne(() => Phm, (phm) => phm.appointments)
  // phm: Phm;

  // @ManyToOne(() => Moh, (moh) => moh.appointments)
  // moh: Moh;
}
