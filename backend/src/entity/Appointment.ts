import { Entity, PrimaryGeneratedColumn, Column,DeleteDateColumn, ManyToOne } from "typeorm";
import { Mother } from "./Mother";


@Entity()
export class Appointment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  appointment_type: string; 

  @Column({ type: 'date', nullable: true })
  startDate: Date;

  @Column({ type: 'date', nullable: true })
  endDate: Date;

  @Column({nullable: true})
  month: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @Column({ default: false })
  checkedByMother: boolean;

  @Column({ default: false })
  checkedByPHM: boolean;

  @ManyToOne(() => Mother, (mother) => mother.appointments)
  mother: Mother;

  
}
