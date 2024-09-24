import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MedicalSurgicalHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'boolean' })
  diabetes: boolean;

  @Column({ type: 'boolean' })
  hypertension: boolean;

  @Column({ type: 'boolean' })
  cardiac_diseases: boolean;

  @Column({ type: 'boolean' })
  renal_diseases: boolean;

  @Column({ type: 'boolean' })
  hepatic_diseases: boolean;

  @Column({ type: 'boolean' })
  psychiatric_illnesses: boolean;

  @Column({ type: 'boolean' })
  epilepsy: boolean;

  @Column({ type: 'boolean' })
  malignancies: boolean;

  @Column({ type: 'boolean' })
  haematological_diseases: boolean;

  @Column({ type: 'boolean' })
  tuberculosis: boolean;

  @Column({ type: 'boolean' })
  thyroid_diseases: boolean;

  @Column({ type: 'boolean' })
  bronchial_asthma: boolean;

  @Column({ type: 'boolean' })
  previous_dvt: boolean;

  @Column({ type: 'boolean' })
  surgeries_other_than_lscs: boolean;

  @Column({ type: 'varchar', length: 255 })
  other: string;

  @Column({ type: 'varchar', length: 255 })
  social_z_score: string;
}
