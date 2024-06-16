import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

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

  @Column({
    type: "enum",
    enum: UserRole,
    default: UserRole.MOTHER,
  })
  role: UserRole;

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
