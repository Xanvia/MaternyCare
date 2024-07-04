import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    ManyToOne,
  } from "typeorm";
import { Mother } from "./Mother";
  
  @Entity()
  export class FieldArea {
    @PrimaryGeneratedColumn()
    id: number;

    @ManyToOne(() => Mother, (mother) => mother.id)
    m_id: Mother;
  
    @Column({ type: 'varchar', length: 255 })
    district: string;

    @Column({ type: 'varchar', length: 255 })
    field_area: string;

  }
  