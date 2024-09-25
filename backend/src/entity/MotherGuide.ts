import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity()
export class MotherGuide {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  subtitle: string;

  @Column("text")
  message: string;

  @Column()
  imagePath: string;  // This will store the image path like "F:/University/MaternyCare/backend/src/images/filename.jpg"

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;

  @Column({ type: "timestamp", nullable: true, onUpdate: "CURRENT_TIMESTAMP" })
  updatedAt: Date;
}
