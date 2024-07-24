import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from "typeorm";
import { Mother } from "./Mother";
import { Phm } from "./Phm";
import { Moh } from "./Moh";

export enum UserRole {
  ADMIN = "admin",
  MOTHER = "mother",
  MOH = "moh",
  PHM = "phm",
}

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  firstName: string;

  @Column()
  lastName: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MOTHER,
  })
  role: UserRole;

  @OneToOne(() => Mother, (mother) => mother.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  mother: Mother;

  @OneToOne(() => Phm, (phm) => phm.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  phm: Phm;

  @OneToOne(() => Moh, (moh) => moh.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  @JoinColumn()
  moh: Moh;
}
