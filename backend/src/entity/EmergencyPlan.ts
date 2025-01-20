import { Entity, PrimaryGeneratedColumn, Column, OneToOne } from "typeorm";
import { Mother } from "./Mother";

@Entity()
export class EmergencyPlan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "varchar", length: 255 })
  intented_hospital_delivery: string;

  @Column({ type: "varchar", length: 255 })
  intented_hospital_emergency: string;

  @Column({ type: "varchar", length: 255 })
  mode_of_transport_delivery: string;

  @Column({ type: "varchar", length: 255 })
  mode_of_transport_emergency: string;

  @Column({ type: "varchar", length: 255 })
  average_cost_delivery: string;

  @Column({ type: "varchar", length: 255 })
  average_cost_emergency: string;

  @Column({ type: "varchar", length: 255 })
  distance_from_home_delivery: string;

  @Column({ type: "varchar", length: 255 })
  distance_from_home_emergency: string;

  @Column({ type: "varchar", length: 255 })
  time_to_reach_delivery: string;

  @Column({ type: "varchar", length: 255 })
  time_to_reach_emergency: string;

  @OneToOne(() => Mother, (mother) => mother.emergencyPlan)
  mother: Mother;
}
