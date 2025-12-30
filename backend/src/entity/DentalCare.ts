import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Mother } from "./Mother";

@Entity()
export class DentalCare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "date" })
  referred_date: Date;

  @Column({ type: "date", nullable: true })
  examination_date: Date;

  @Column({ type: "text", nullable: true })
  treatment: string;

  @OneToOne(() => Mother, (mother) => mother.dentalCare)
  mother: Mother;
}
