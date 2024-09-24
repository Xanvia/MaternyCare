import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class TetanusToxoidImmunization {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    Dose: number;

    @Column({ type: 'date' })
    Date: Date;

    @Column({ type: 'int' })
    Batch_no: number;

  }
  