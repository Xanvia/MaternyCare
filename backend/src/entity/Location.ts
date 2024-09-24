import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class Location {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'varchar', length: 255 })
    address: string;
  
    @Column({ type: 'varchar', length: 100 })
    country: string;
  
    @Column({ type: 'varchar', array: true })
    province: string[];
  
    @Column({ type: 'varchar', array: true })
    state: string[];
  
    @Column({ type: 'int' })
    postalCode: number;
  
    @Column({ type: 'varchar', length: 100 })
    gsDivision: string;
  }
  