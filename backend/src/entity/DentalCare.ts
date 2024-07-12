import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DentalCare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  referred_date: Date;

  @Column({ type: 'date' })
  examination_date: Date;

  @Column({ type: 'text' })
  treatment: string;
}
