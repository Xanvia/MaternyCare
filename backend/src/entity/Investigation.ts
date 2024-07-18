import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class Investigation {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    boold_sugar: string;

    @Column({ type: 'varchar', length: 255 })
    heamoglobin: string;

    @Column({ type: 'varchar', length: 255 })
    other_investigations: string;

  }
  