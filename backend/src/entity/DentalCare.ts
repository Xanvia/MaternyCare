import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Mother } from "./Mother";

@Entity()
export class DentalCare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  referred_date: Date;

  @Column({ type: "date" })
  examination_date: Date;

  @Column({ type: "text" })
  treatment: string;

  @OneToOne(() => Mother, (mother) => mother.dentalCare)
  mother: Mother;
}
