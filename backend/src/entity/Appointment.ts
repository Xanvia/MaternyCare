import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  DeleteDateColumn,
  ManyToOne,
  BeforeInsert,
  BeforeUpdate,
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

  @Column({ type: "date", nullable: true })
  startDate: Date; // Use Date type for startDate

  @Column({ type: "date", nullable: true })
  endDate: Date;

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

  // @ManyToOne(() => Phm, (phm) => phm.appointments)
  // phm: Phm;

  // @ManyToOne(() => Moh, (moh) => moh.appointments)
  // moh: Moh;
}
