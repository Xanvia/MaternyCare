import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class KickCount {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    kickCount: number;

    @Column({ type: 'date' })
    Date_of_issuing_kick_count_chart: Date;

  }
  