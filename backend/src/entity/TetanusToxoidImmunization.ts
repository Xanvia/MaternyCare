import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class DentalCare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  dose: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  batch_no: string;
}
