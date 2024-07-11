import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PastObstetricHistory {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  pregnancy_id: number;

  @Column({ type: 'varchar', length: 255 })
  antenatal_complications: string;

  @Column({ type: 'varchar', length: 255 })
  place: string;

  @Column({ type: 'varchar', length: 255 })
  delivery_mode: string;

  @Column({ type: 'varchar', length: 255 })
  outcome: string;

  @Column({ type: 'varchar', length: 255 })
  birth_weight: string;

  @Column({ type: 'varchar', length: 255 })
  postnatal_complications: string;

  @Column({ type: 'enum', enum: ['male', 'female'] })
  sex: 'male' | 'female';

  @Column({ type: 'int' })
  age: number;
}
