import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Appointment } from "./Appointment";
import { User } from "./User";

@Entity()
export class Moh {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  mohID: string;

  @Column({ nullable: true })
  NIC: string;

  @Column({ nullable: true })
  mohArea: string;

  @Column({ nullable: true })
  motherCount: number;

  @Column({ nullable: true })
  babyCount: number;

  @Column({ nullable: true })
  starPoints: number;

  @OneToOne(() => User, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  // @OneToMany(() => Appointment, (appointment) => appointment.moh)
  // appointments: Appointment[];
}
