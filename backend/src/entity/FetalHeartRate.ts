import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class FetalHeartRate {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    fetalHeartRate: number;

  }
  