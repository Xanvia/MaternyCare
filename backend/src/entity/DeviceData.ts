import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from "typeorm";

@Entity()
export class DeviceData {
    @PrimaryGeneratedColumn()
    id: number;

    @Column("float")
    heartRate: number;

    @Column("float", { nullable: true })
    signalQuality: number;

    @Column()
    isScanning: boolean;

    @CreateDateColumn()
    timestamp: Date;
}