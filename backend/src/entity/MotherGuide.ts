import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
    CreateDateColumn,
    DeleteDateColumn,
  } from "typeorm";
  
  @Entity()
  export class MotherGuide {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column()
    title: string;
  
    @Column()
    subtitle: string;
  
    @Column()
    message: string;

    // @Column({default:})
    // imageURL: string;
  
    @CreateDateColumn()
    createdAt: Date;
  
    @DeleteDateColumn({ nullable: true })
    deletedAt: Date | null;
  }
  