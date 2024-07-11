import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class FamilyHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  diabetes_mellitus: boolean;

  @Column({ type: 'boolean' })
  hypertension: boolean;

  @Column({ type: 'boolean' })
  haematological_diseases: boolean;

  @Column({ type: 'boolean' })
  twin_multiple_pregnancies: boolean;

  @Column({ type: 'varchar', length: 255 })
  others: string;
}
