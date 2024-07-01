import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class Location {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    kickCount: number;

  }
  