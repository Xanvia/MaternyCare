import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class Notice {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ type: "varchar", length: 255 })
  title!: string;

  @Column({ type: "varchar", length: 255 })
  sub_title!: string;

  @Column({ type: "text" })
  message!: string;

  @Column({ type: "varchar", length: 255 })
  image_url!: string;
}
