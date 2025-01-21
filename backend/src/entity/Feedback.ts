import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, DeleteDateColumn } from "typeorm";
import { Mother } from "./Mother";
import { Phm } from "./Phm";
// import { Appointment } from "./Appointment";

@Entity()
export class Feedback {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  feedback_content: string;

  @DeleteDateColumn({ nullable: true })
  deletedAt: Date | null;

  @ManyToOne(() => Mother, (mother) => mother.feedbacks)
  mother: Mother;

  @ManyToOne(() => Phm, (phm) => phm.feedbacks)
  phm: Phm;

  // @OneToOne(() => Appointment, {
  //   nullable: true,
  //   onDelete: "CASCADE",
  // })
  // @JoinColumn()
  // appointment: Appointment;
}
