import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MedicalRecord {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  poa1: string;

  @Column({ type: 'varchar', length: 255 })
  poa2: string;

  @Column({ type: 'varchar', length: 255 })
  poa3: string;

  @Column({ type: 'varchar', length: 255 })
  poa4: string;

  @Column({ type: 'varchar', length: 255 })
  poa5: string;

  @Column({ type: 'varchar', length: 255 })
  poa6: string;

  @Column({ type: 'varchar', length: 255 })
  poa7: string;

  @Column({ type: 'varchar', length: 255 })
  poa8: string;

  @Column({ type: 'varchar', length: 255 })
  poa9: string;

  @Column({ type: 'varchar', length: 255 })
  poa10: string;

  @Column({ type: 'varchar', length: 255 })
  weight1: string;

  @Column({ type: 'varchar', length: 255 })
  weight2: string;

  @Column({ type: 'varchar', length: 255 })
  weight3: string;

  @Column({ type: 'varchar', length: 255 })
  weight4: string;

  @Column({ type: 'varchar', length: 255 })
  weight5: string;

  @Column({ type: 'varchar', length: 255 })
  weight6: string;

  @Column({ type: 'varchar', length: 255 })
  weight7: string;

  @Column({ type: 'varchar', length: 255 })
  weight8: string;

  @Column({ type: 'varchar', length: 255 })
  weight9: string;

  @Column({ type: 'varchar', length: 255 })
  weight10: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain1: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain2: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain3: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain4: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain5: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain6: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain7: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain8: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain9: string;

  @Column({ type: 'varchar', length: 255 })
  weight_gain10: string;
}
