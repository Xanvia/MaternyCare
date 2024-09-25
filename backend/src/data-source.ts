import "reflect-metadata";
import { DataSource } from "typeorm";
import { User } from "./entity/User";
import { Notice } from "./entity/Notice";
import { Mother } from "./entity/Mother";
import { Phm } from "./entity/Phm";
import { Appointment } from "./entity/Appointment";
import { FieldArea } from "./entity/FieldArea";
import { Feedback } from "./entity/Feedback";
import { AttendanceAntenatalClasses } from "./entity/AttendanceAntenatalClasses";
import { DentalCare } from "./entity/DentalCare";
import { FamilyHistory } from "./entity/FamilyHistory";
import { FetalHeartRate } from "./entity/FetalHeartRate";
import { HealthAssessment } from "./entity/HealthAssessment";
import { Investigation } from "./entity/Investigation";
import { KickCount } from "./entity/KickCount";
import { Location } from "./entity/Location";
import { MedicalSurgicalHistory } from "./entity/MedicalSurgicalHistory";
import { Moh } from "./entity/Moh";
import { PastObstetricHistory } from "./entity/PastObstetricHistory";
import { PersonalInformation } from "./entity/PersonalInformation";
import { SyphilisScreening } from "./entity/SyphilisScreening";
import { TetanusToxoidImmunization } from "./entity/TetanusToxoidImmunization";
import { WeightGainChart } from "./entity/WeightGainChart";
import { MotherGuide } from "./entity/MotherGuide";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "test",
  password: "letmein",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [User, Notice, Mother, Phm, Appointment, Feedback, FieldArea, AttendanceAntenatalClasses, DentalCare, FamilyHistory, FetalHeartRate, HealthAssessment, Investigation, KickCount, Location, MedicalSurgicalHistory, Moh, PastObstetricHistory, PersonalInformation, SyphilisScreening, TetanusToxoidImmunization, WeightGainChart, MotherGuide],
  migrations: [],
  subscribers: [],
});
