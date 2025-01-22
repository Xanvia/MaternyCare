import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Mother } from "./Mother";
import { Moh } from "./Moh";
import { Vog } from "./Vog";

export enum UserRole {
  ADMIN = "admin",
  MOTHER = "mother",
  MOH = "moh",
  PHM = "phm",
  VOG = "vog",
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

  @Column({ nullable: true })
  nic: string;

  @Column()
  password: string;

  @Column({ type: "text", nullable: true })
  profilePic: string;

  @Column({ default: false })
  isVerified: boolean;

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MOTHER,
  })
  role: UserRole;

  @OneToOne(() => Mother, (mother) => mother.user)
  mother: Mother;

  @OneToOne(() => Moh, (moh) => moh.user)
  moh: Moh;

  @OneToOne(() => Vog, (vog) => vog.user)
  vog: Vog;
}
