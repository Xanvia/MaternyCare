import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class HealthAssessment {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  test_id: number;

  @Column({ type: 'varchar', length: 255 })
  auscultation: string;

  @Column({ type: 'varchar', length: 255 })
  mental_health: string;
}
