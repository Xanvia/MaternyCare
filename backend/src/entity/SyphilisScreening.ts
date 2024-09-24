import {
    Entity,
    PrimaryGeneratedColumn,
    Column,
  } from "typeorm";
  
  @Entity()
  export class SyphilisScreening {
    @PrimaryGeneratedColumn()
    id: number;
  
    @Column({ type: 'int' })
    POA_at_blood_sampling: number;

    @Column({ type: 'date' })
    Date_of_blood_sampling: Date;

    @Column({ type: 'date' })
    Date_of_result_received: Date;

    @Column({ type: 'enum', enum: ['NR', 'R'] })
    Result: 'NR' | 'R';

    @Column({ type: 'date' })
    if_r_date_of_referral: Date;

  }
  