import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from "typeorm";
import { Mother } from "./Mother";
import { Phm } from "./Phm";
  
  @Entity()
  export class FieldArea {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Mother, (mother) => mother.feedbacks)
    mother: Mother;

    @ManyToOne(() => Phm, (phm) => phm.feedbacks)
    phm: Phm;

    @Column({ type: 'varchar', length: 255 })
    content: string;

  }
  