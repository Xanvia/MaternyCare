// import {
//   Entity,
//   PrimaryGeneratedColumn,
//   Column,
//   OneToOne,
//   JoinColumn,
// } from "typeorm";
// import { Mother } from "./Mother";
// import { Phm } from "./Phm";
// import { Moh } from "./Moh";

// export enum UserRole {
//   ADMIN = "admin",
//   MOTHER = "mother",
//   MOH = "moh",
//   PHM = "phm",
// }

// @Entity()
// export class User {
//   @PrimaryGeneratedColumn()
//   id: number;

//   @Column()
//   firstName: string;

//   @Column()
//   lastName: string;

//   @Column()
//   email: string;

//   @Column()
//   password: string;

//   @Column({ default: false })
//   isVerified: boolean;

//   @Column({
//     type: "enum",
//     enum: UserRole,
//     default: UserRole.MOTHER,
//   })
//   role: UserRole;
// }

import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Mother } from "./Mother";

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

  @OneToOne(() => Mother, (mother) => mother.user)
  mother: Mother;
}
