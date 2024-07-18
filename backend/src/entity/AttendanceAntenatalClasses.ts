import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class AttendanceAntenatalClasses {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'int' })
  session_id: number;

  @Column({ type: 'date' })
  date: Date;

  @Column({ type: 'varchar', length: 255 })
  husband: string;

  @Column({ type: 'varchar', length: 255 })
  wife: string;

  @Column({ type: 'varchar', length: 255 })
  other: string;

  @Column({ type: 'varchar', length: 255 })
  signature: string;
}
