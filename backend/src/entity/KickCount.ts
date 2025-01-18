import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";
import { Mother } from "./Mother";

@Entity()
export class KickCount {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int" })
  kickCount: number;

  @CreateDateColumn({ type: "timestamp" })
  Date_of_issuing: Date;

  @ManyToOne(() => Mother, (mother) => mother.kickCounts)
  mother: Mother;
}
