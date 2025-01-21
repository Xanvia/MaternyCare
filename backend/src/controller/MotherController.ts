import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User } from "../entity/User";
import { Phm } from "../entity/Phm";
import { KickCount } from "../entity/KickCount";
import { EmergencyPlan } from "../entity/EmergencyPlan";

export class MotherController {
  private motherRepository = AppDataSource.getRepository(Mother);
  private userRepository = AppDataSource.getRepository(User);
  private phmRepository = AppDataSource.getRepository(Phm);
  private kickCountRepository = AppDataSource.getRepository(KickCount);
  private emergencyRepository = AppDataSource.getRepository(EmergencyPlan);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.motherRepository.find({
      relations: ["user", "phm", "appointments"],
    });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    // const user = await this.userRepository.findOne({ where: { id } });

    const mother = await this.motherRepository.findOne({
      where: { id },
      relations: ["user", "phm", "appointments"],
    });

    if (!mother) {
      return "unlisted mother";
    }
    return mother;
  }

  async getMotherByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({ where: { id } });

    const mother = await this.motherRepository.findOne({
      where: { user },
      relations: ["user", "phm"],
    });

    if (!mother) {
      return "unlisted mother";
    }
    return mother;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { age, nic, phone_1, bio, delivery_date, address } = request.body;

    console.log("debug role", request.user.userRole);

    if (request.user.userRole !== "mother") {
      console.log(request.user.userRole);
      // return "You are not authorized to create a Mother";
      return { message: "You are not authorized to create a Mother" };
    }

    const userId = request.user?.userId;

    if (!userId) {
      return { message: "You are not authorized to create a Mother" };
    }

    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return { message: "User not found" };
      }

      // const mother = Object.assign(new Mother(), {
      //   age,
      //   nic,
      //   risk_type,
      //   phone_1,
      //   bio,
      //   user: user,
      // });

      const mother = new Mother();
      mother.age = age;
      mother.nic = nic;
      // mother.risk_type = risk_type;
      mother.address = address;
      mother.phone_1 = phone_1;
      mother.bio = bio;
      mother.user = user;
      mother.delivery_date = delivery_date; // Set the user relationship

      // if (phmId) {
      //   const phm = await this.phmRepository.findOne({ where: { id: phmId } });
      //   if (!phm) {
      //     return response.status(404).json({ message: "PHM not found" });
      //   }
      //   mother.phm = phm; // Set the PHM relationship
      // }

      await this.motherRepository.save(mother);
      // return response.status(201).json(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updateBasicDetails(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const {
      mother_blood_type,
      mother_height,
      allergies,
      moh_area,
      phm_area,
      field_clinic,
      consultant_obstetrician,
      antenatal_risk_conditions,
      eligible_family_register,
      pregnant_mother_register,
      gs_division,
      risk_type,
      registration_no,
      registration_date,
      mother_weight,
      hospital_clinic,
      consanguinity,
      rubella_immunization,
      pre_pregnancy_screening,
      preconceptional_folic_acid,
      history_of_subfertility,
      planned_pregnancy,
      last_family_planing_method,
    } = request.body;

    const userId = request.user?.userId;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id },
        relations: ["user", "phm"],
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Update the mother's details
      mother.mother_blood_type = mother_blood_type ?? mother.mother_blood_type;
      mother.mother_height = mother_height ?? mother.mother_height;
      mother.allergies = allergies ?? mother.allergies;
      mother.moh_area = moh_area ?? mother.moh_area;
      mother.phm_area = phm_area ?? mother.phm_area;
      mother.field_clinic = field_clinic ?? mother.field_clinic;
      mother.consultant_obstetrician =
        consultant_obstetrician ?? mother.consultant_obstetrician;
      mother.antenatal_risk_conditions =
        antenatal_risk_conditions ?? mother.antenatal_risk_conditions;
      mother.eligible_family_register =
        eligible_family_register ?? mother.eligible_family_register;
      mother.pregnant_mother_register =
        pregnant_mother_register ?? mother.pregnant_mother_register;
      mother.gs_division = gs_division ?? mother.gs_division;
      mother.risk_type = risk_type ?? mother.risk_type;
      mother.registration_no = registration_no ?? mother.registration_no;
      mother.registration_date = registration_date ?? mother.registration_date;
      mother.mother_weight = mother_weight ?? mother.mother_weight;
      mother.hospital_clinic = hospital_clinic ?? mother.hospital_clinic;
      mother.consanguinity = consanguinity ?? mother.consanguinity;
      mother.rubella_immunization =
        rubella_immunization ?? mother.rubella_immunization;
      mother.pre_pregnancy_screening =
        pre_pregnancy_screening ?? mother.pre_pregnancy_screening;
      mother.preconceptional_folic_acid =
        preconceptional_folic_acid ?? mother.preconceptional_folic_acid;
      mother.history_of_subfertility =
        history_of_subfertility ?? mother.history_of_subfertility;
      mother.planned_pregnancy = planned_pregnancy ?? mother.planned_pregnancy;
      mother.last_family_planing_method =
        last_family_planing_method ?? mother.last_family_planing_method;

      console.log("phm ", userId);
      if (userId) {
        const user = await this.userRepository.findOne({
          where: { id: userId },
        });
        const phm = await this.phmRepository.findOne({
          where: { user },
          relations: ["user"],
        });
        if (!phm) {
          return { message: "PHM not found" };
        }
        mother.phm = phm; // Update the PHM relationship
      }

      await this.motherRepository.save(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updateClinicCareCheckUp(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const {
      Respiratory_system,
      Breast_examination,
      Other_investigations,
      Antihelminthic_drugs,
      date_of_issuing_kick_count_chart,
      Date_of_taking_blood_sample_for_HIV_screening,
      Date_of_result_informed_to_mother,
    } = request.body;

    const userId = request.user?.userId;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id },
        relations: ["user", "phm"],
      });

      if (!mother) {
        return response.status(404).json({ message: "Mother not found" });
      }

      // Update the mother's clinic care checkup details
      mother.Respiratory_system =
        Respiratory_system ?? mother.Respiratory_system;
      mother.Breast_examination =
        Breast_examination ?? mother.Breast_examination;
      mother.Other_investigations =
        Other_investigations ?? mother.Other_investigations;
      mother.Antihelminthic_drugs =
        Antihelminthic_drugs ?? mother.Antihelminthic_drugs;
      mother.date_of_issuing_kick_count_chart =
        date_of_issuing_kick_count_chart ??
        mother.date_of_issuing_kick_count_chart;
      mother.Date_of_taking_blood_sample_for_HIV_screening =
        Date_of_taking_blood_sample_for_HIV_screening ??
        mother.Date_of_taking_blood_sample_for_HIV_screening;
      mother.Date_of_result_informed_to_mother =
        Date_of_result_informed_to_mother ??
        mother.Date_of_result_informed_to_mother;

      console.log("phm ", userId);
      if (userId) {
        const user = await this.userRepository.findOne({
          where: { id: userId },
        });
        const phm = await this.phmRepository.findOne({
          where: { user },
          relations: ["user"],
        });
        if (!phm) {
          return response.status(404).json({ message: "PHM not found" });
        }
        mother.phm = phm; // Update the PHM relationship
      }

      await this.motherRepository.save(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updatePresentObstetricHistory(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const {
      gravidity_G,
      gravidity_P,
      gravidity_C,
      age_of_youngest_child,
      LRMP,
      EDD,
      US_corrected_EDD,
      POA_at_dating_scan,
      date_of_quickening,
      POA_at_registration,
    } = request.body;

    const userId = request.user?.userId;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id },
        relations: ["user", "phm"],
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Update the mother's details
      mother.gravidity_G = gravidity_G ?? mother.gravidity_G;
      mother.gravidity_P = gravidity_P ?? mother.gravidity_P;
      mother.gravidity_C = gravidity_C ?? mother.gravidity_C;
      mother.age_of_youngest_child =
        age_of_youngest_child ?? mother.age_of_youngest_child;
      mother.LRMP = LRMP ?? mother.LRMP;
      mother.EDD = EDD ?? mother.EDD;
      mother.US_corrected_EDD = US_corrected_EDD ?? mother.US_corrected_EDD;
      mother.POA_at_dating_scan =
        POA_at_dating_scan ?? mother.POA_at_dating_scan;
      mother.date_of_quickening =
        date_of_quickening ?? mother.date_of_quickening;
      mother.POA_at_registration =
        POA_at_registration ?? mother.POA_at_registration;

      console.log("phm ", userId);
      if (userId) {
        const user = await this.userRepository.findOne({
          where: { id: userId },
        });
        const phm = await this.phmRepository.findOne({
          where: { user },
          relations: ["user"],
        });
        if (!phm) {
          return { message: "PHM not found" };
        }
        mother.phm = phm; // Update the PHM relationship
      }

      await this.motherRepository.save(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updateEmergencyPlan(request: Request, response: Response) {
    const {
      motherId,
      intented_hospital_delivery,
      intented_hospital_emergency,
      mode_of_transport_delivery,
      mode_of_transport_emergency,
      average_cost_delivery,
      average_cost_emergency,
      distance_from_home_delivery,
      distance_from_home_emergency,
      time_to_reach_delivery,
      time_to_reach_emergency,
    } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: motherId },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      const newEmergencyPlan = new EmergencyPlan();
      newEmergencyPlan.intented_hospital_delivery = intented_hospital_delivery;
      newEmergencyPlan.intented_hospital_emergency =
        intented_hospital_emergency;
      newEmergencyPlan.mode_of_transport_delivery = mode_of_transport_delivery;
      newEmergencyPlan.mode_of_transport_emergency =
        mode_of_transport_emergency;
      newEmergencyPlan.average_cost_delivery = average_cost_delivery;
      newEmergencyPlan.average_cost_emergency = average_cost_emergency;
      newEmergencyPlan.distance_from_home_delivery =
        distance_from_home_delivery;
      newEmergencyPlan.distance_from_home_emergency =
        distance_from_home_emergency;
      newEmergencyPlan.time_to_reach_delivery = time_to_reach_delivery;
      newEmergencyPlan.time_to_reach_emergency = time_to_reach_emergency;
      newEmergencyPlan.mother = mother;

      await this.emergencyRepository.save(newEmergencyPlan);

      return {
        message: "Emergency plan updated successfully",
        data: newEmergencyPlan,
      };
    } catch (error) {
      console.error("Error updating Emergency plan:", error);
      return "Internal server error";
    }
  }

  async updateCounselingForm(request: Request, response: Response) {
    const {
      motherId,
      date_of_counseling,
      chosen_method,
      reason_for_not_using_method,
      consent_form_signed_date,
    } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: motherId },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // const newEmergencyPlan = new EmergencyPlan();
      mother.date_of_counseling = date_of_counseling;
      mother.chosen_method = chosen_method;
      mother.reason_for_not_using_method = reason_for_not_using_method;
      mother.consent_form_signed_date = consent_form_signed_date;

      await this.motherRepository.save(mother);

      return {
        message: "Counseling form updated successfully",
        data: mother,
      };
    } catch (error) {
      console.error("Error updating Emergency plan:", error);
      return "Internal server error";
    }
  }
  async updateVogSignature(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const { signature } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Update the mother's signature
      mother.vogSignature = signature;

      await this.motherRepository.save(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updateSignature(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const { signature } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Update the mother's signature
      mother.signature = signature;

      await this.motherRepository.save(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updateDentistSignature(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const { dentistsignature } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Update the mother's signature
      mother.dentistsignature = dentistsignature;

      await this.motherRepository.save(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updateDashboard(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    console.log("id", id);
    const { kick_count, fetal_heart_rate } = request.body;

    const user = await this.userRepository.findOne({ where: { id } });
    console.log("user", user);

    try {
      const mother = await this.motherRepository.findOne({
        where: { user },
        relations: ["user"],
      });

      console.log("mother", mother);

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Update the mother's details
      // mother.kick_count = kick_count ?? mother.kick_count;
      // mother.fetal_heart_rate = fetal_heart_rate ?? mother.fetal_heart_rate;

      await this.motherRepository.save(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async updateKickCount(request: Request, response: Response) {
    const { motherId, kickCount } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: motherId },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      const newKickCount = new KickCount();
      newKickCount.kickCount = kickCount;
      newKickCount.mother = mother;

      await this.kickCountRepository.save(newKickCount);

      return "Kick count updated successfully";
    } catch (error) {
      console.error("Error updating kick count:", error);
      return "Internal server error";
    }
  }

  async getKickCountData(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const motherId = parseInt(request.params.motherId);

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: motherId },
        relations: ["kickCounts"],
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      return mother.kickCounts;
    } catch (error) {
      console.error("Error fetching kick count data:", error);
      return { message: "Internal server error" };
    }
  }

  async getEmergencyData(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const motherId = parseInt(request.params.motherId);

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: motherId },
        relations: ["emergencyPlan"],
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      return mother.emergencyPlan;
    } catch (error) {
      console.error("Error fetching emergency plan data:", error);
      return { message: "Internal server error" };
    }
  }

  async getCounselingDetails(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const motherId = parseInt(request.params.motherId);

    try {
      const mother = await this.motherRepository.findOne({
        where: { id: motherId },
      });

      if (!mother) {
        return response.status(404).json({ message: "Mother not found" });
      }

      const counselingDetails = {
        date_of_counseling: mother.date_of_counseling,
        chosen_method: mother.chosen_method,
        reason_for_not_using_method: mother.reason_for_not_using_method,
        consent_form_signed_date: mother.consent_form_signed_date,
      };

      return { counselingDetails };
    } catch (error) {
      console.error("Error fetching counseling details:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let motherToRemove = await this.motherRepository.findOneBy({ id });

    if (!motherToRemove) {
      return "this mother not exist";
    }

    await this.motherRepository.remove(motherToRemove);

    return "mother has been removed";
  }

  async getPhmAllMothersByPhmId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const phmId = parseInt(request.params.id);

    const phm = await this.phmRepository.findOne({
      where: { id: phmId },
    });

    const mothers = await this.motherRepository.find({
      where: { phm: { id: phmId } },
      relations: ["user", "phm", "appointments"],
    });

    // if (!phm) {
    //   return response
    //     .status(404)
    //     .json({ message: "PHM not found for the given Phm ID" });
    // }

    // if (!mothers.length) {
    //   return response
    //     .status(404)
    //     .json({ message: "No mothers found for the given PHM ID" });
    // }

    return mothers;
  }

  async getMotherByUser(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userId = parseInt(request.params.userId);
    console.log("teeeeeeeeeeeest");
    const user = await this.userRepository.findOne({
      where: { id: userId },
    });

    const mother = await this.motherRepository.findOne({
      where: { user },
    });

    return mother;
  }

  async getMothersByRiskType(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    // const riskType = request.params.riskType;

    try {
      const mothers = await this.motherRepository.find({
        where: { risk_type: "red" },
        relations: ["user", "phm", "appointments"],
      });

      if (!mothers.length) {
        return { message: `No mothers found with risk type red` };
      }

      return mothers;
    } catch (error) {
      return next(error);
    }
  }

  async updateRedMotherContent(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);
    const { richTextContent } = request.body;

    try {
      const mother = await this.motherRepository.findOne({
        where: { id },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Update the mother's rich text content
      mother.richTextContent = richTextContent;

      await this.motherRepository.save(mother);
      response.send(mother);
      return;
    } catch (error) {
      return next(error);
    }
  }

  async getRedMotherContent(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const id = parseInt(request.params.id);

    try {
      const mother = await this.motherRepository.findOne({
        where: { id },
      });

      if (!mother) {
        return { message: "Mother not found" };
      }

      // Return the mother's rich text content
      return { richTextContent: mother.richTextContent };
    } catch (error) {
      return next(error);
    }
  }

  async getPhmAllMothersByUserId(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    const userId = parseInt(request.params.id);
    console.log(userId);

    const phm = await this.phmRepository.findOne({
      where: { user: { id: userId } },
    });
    console.log(phm.id);
    const mothers = await this.motherRepository.find({
      where: { phm: { id: phm.id } },
      relations: ["user", "phm", "appointments"],
    });

    if (!phm) {
      return { message: "PHM not found for the given User ID" };
    }

    if (!mothers.length) {
      return { message: "No mothers found for the associated PHM" };
    }

    return mothers;
  }
}
