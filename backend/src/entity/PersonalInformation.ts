import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class PersonalInformation {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  wife_age: number;

  @Column({ type: 'varchar', length: 255 })
  wife_education_level: string;

  @Column({ type: 'varchar', length: 255 })
  wife_occupation: string;

  @Column({ type: 'int' })
  husband_age: number;

  @Column({ type: 'varchar', length: 255 })
  husband_education_level: string;

  @Column({ type: 'varchar', length: 255 })
  husband_occupation: string;
}
