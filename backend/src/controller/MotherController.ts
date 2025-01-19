import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User } from "../entity/User";
import { Phm } from "../entity/Phm";
import { KickCount } from "../entity/KickCount";

export class MotherController {
  private motherRepository = AppDataSource.getRepository(Mother);
  private userRepository = AppDataSource.getRepository(User);
  private phmRepository = AppDataSource.getRepository(Phm);
  private kickCountRepository = AppDataSource.getRepository(KickCount);

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
      location,
      phm_area,
      field_clinic,
      consultant_obstetrician,
      antenatal_risk_conditions,
      eligible_family_register,
      pregnant_mother_register,
      gs_division,
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
      mother.location = location ?? mother.location;
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
