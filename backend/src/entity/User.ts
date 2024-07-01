import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Mother } from "./Mother";
import { Phm } from "./Phm";

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
  mother: Mother;

  @OneToOne(() => Phm, (phm) => phm.user, {
    nullable: true,
    onDelete: "CASCADE",
  })
  phm: Phm;

  // toJSON() {
  //   return {
  //     id: this.id,
  //     firstName: this.firstName,
  //     lastName: this.lastName,
  //     email: this.email,
  //     role: this.role,
  //   };
  // }
}
