import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
  ManyToOne,
} from "typeorm";
// import { Appointment } from "./Appointment";
import { User } from "./User";
// import { FieldArea } from "./FieldArea";
import { Feedback } from "./Feedback";
import { Mother } from "./Mother";
import { Moh } from "./Moh";

@Entity()
export class Phm {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "int", nullable: true })
  phone_number: number;

  @Column({ type: "varchar",length: 255, nullable: true })
  phm_id: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  phm_area: string;

  @Column({ type: "varchar", length: 255, nullable: true })
  moh_division: string;

  @Column({ type: "int", nullable: true })
  mother_count: number;

  @Column({ type: "int", nullable: true })
  baby_count: number;

  @Column({ type: "int", nullable: true })
  star_points: number;

  // @OneToMany(() => Appointment, (appointment) => appointment.phm)
  // appointments: Appointment[];

  // @OneToMany(() => Feedback, (feedback) => feedback.phm)
  // feedbacks: Feedback[];

  // @OneToOne(() => FieldArea, (fielaArea) => fielaArea.id)
  // @JoinColumn()
  // fielaArea: FieldArea;

  @OneToMany(() => Mother, (mother) => mother.phm)
  mothers: Mother[];

  @OneToMany(() => Feedback, (feedback) => feedback.phm)
  feedbacks: Feedback[];

  @OneToOne(() => User, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  @ManyToOne(() => Moh, (moh) => moh.phms, {
    nullable: true,
    eager: true,
    onDelete: "SET NULL", // When PHM is deleted, mothers can remain with no assigned PHM
  })
  moh: Moh;
}
