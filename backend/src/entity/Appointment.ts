import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from "typeorm";
import { Mother } from "./Mother";
import { Phm } from "./Phm";

@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  type: string; // prenatal or postnatal

  @Column("daterange")
  dateRange: string; // PostgreSQL daterange type

  @Column({ default: false })
  checkedByMother: boolean;

  @Column({ default: false })
  checkedByPHM: boolean;

  @ManyToOne(() => Mother, (mother) => mother.appointments)
  mother: Mother;

  @ManyToOne(() => Phm, (phm) => phm.appointments)
  phm: Phm;
}
