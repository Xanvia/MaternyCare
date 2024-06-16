import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";

  export enum Status {
    COMPLETE = "complete",
    UNCOMPLETE = "uncompleted",
  }
  
  @Entity()
  export class Mother {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    diliveryDate: string;
  
    @Column()
    fetalAge: string;
  
    @Column({
        type: "enum",
        enum: Status,
        default: Status.UNCOMPLETE,
    })
    status: string;
  
    
  }