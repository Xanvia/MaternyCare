import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  ManyToOne,
} from "typeorm";

import { Mother } from "./Mother";

@Entity()
export class DeviceData {
  @PrimaryGeneratedColumn()
  id: number;

  @Column("float")
  heartRate: number;

  @Column("float", { nullable: true })
  signalQuality: number;

  @Column({ type: "boolean", default: false })
  isScanning: boolean;

  @CreateDateColumn()
  timestamp: Date;

  @ManyToOne(() => Mother, (mother) => mother.deviceData, {
    onDelete: "CASCADE",
  })
  mother: Mother;
}
