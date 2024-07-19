import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class ClinicCare {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'date' })
  dateOfVisit: Date;

  @Column({ type: 'varchar', length: 255 })
  POA: string;

  @Column({ type: 'varchar', length: 255 })
  urine: string;

  @Column({ type: 'varchar', length: 255 })
  sugar: string;

  @Column({ type: 'varchar', length: 255 })
  albumin: string;

  @Column({ type: 'boolean' })
  pallor: boolean;

  @Column({ type: 'boolean' })
  ankleOedema: boolean;

  @Column({ type: 'boolean' })
  facialOedema: boolean;

  @Column({ type: 'int' })
  BP: number;

  @Column({ type: 'varchar', length: 255 })
  fundalHeight: string;

  @Column({ type: 'varchar', length: 255 })
  foetalLie: string;

  @Column({ type: 'varchar', length: 255 })
  presentation: string;

  @Column({ type: 'varchar', length: 255 })
  engagementOfPresentingPart: string;

  @Column({ type: 'enum', enum: ['positive', 'negative'] })
  FM: 'positive' | 'negative';

  @Column({ type: 'enum', enum: ['positive', 'negative'] })
  FHS: 'positive' | 'negative';

  @Column({ type: 'int' })
  iron: number;

  @Column({ type: 'int' })
  folate: number;

  @Column({ type: 'int' })
  calcium: number;

  @Column({ type: 'int' })
  vitaminC: number;

  @Column({ type: 'varchar', length: 255 })
  foodSupplementation: string;

  @Column({ type: 'varchar', length: 255 })
  officerExamined: string;

  @Column({ type: 'varchar', length: 255 })
  designation: string;
}
