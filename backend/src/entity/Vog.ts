import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
// import { Appointment } from "./Appointment";
import { User } from "./User";

@Entity()
export class Vog {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  phoneNumber: number;

  @Column({ nullable: true })
  vogID: string;

  @Column({ nullable: true })
  NIC: string;

  // @Column({ nullable: true })
  // mohArea: string;

  @Column({ nullable: true })
  motherCount: number;

  @Column({ nullable: true })
  babyCount: number;

  // @Column({ nullable: true })
  // starPoints: number;

  @OneToOne(() => User, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  user: User;

  // @OneToMany(() => Appointment, (appointment) => appointment.moh)
  // appointments: Appointment[];
}
