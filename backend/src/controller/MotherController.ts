import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { Mother } from "../entity/Mother";
import { User } from "../entity/User";
import { Phm } from "../entity/Phm";

export class MotherController {
  private motherRepository = AppDataSource.getRepository(Mother);
  private userRepository = AppDataSource.getRepository(User);
  private phmRepository = AppDataSource.getRepository(Phm);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.motherRepository.find({ relations: ["user", "phm"] });
  }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    // const user = await this.userRepository.findOne({ where: { id } });

    const mother = await this.motherRepository.findOne({
      where: { id },
      relations: ["user", "phm"],
    });

    if (!mother) {
      return "unlisted mother";
    }
    return mother;
  }

  async save(request: Request, response: Response, next: NextFunction) {
    const { age, nic, risk_type, phone_1, bio, phmId, delivery_date} = request.body;

    if (request.user.userRole !== "mother") {
      console.log(request.user.userRole);
      // return "You are not authorized to create a Mother";
      return response
        .status(403)
        .json({ message: "You are not authorized to create a Mother" });
    }

    const userId = request.user?.userId;

    if (!userId) {
      return response
        .status(400)
        .json({ error: "User ID is missing or invalid" });
    }

    try {
      const user = await this.userRepository.findOne({ where: { id: userId } });
      if (!user) {
        return response.status(404).json({ message: "User not found" });
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
      mother.risk_type = risk_type;
      mother.phone_1 = phone_1;
      mother.bio = bio;
      mother.user = user;
      mother.delivery_date = delivery_date; // Set the user relationship

      if (phmId) {
        const phm = await this.phmRepository.findOne({ where: { id: phmId } });
        if (!phm) {
          return response.status(404).json({ message: "PHM not found" });
        }
        mother.phm = phm; // Set the PHM relationship
      }

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

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let motherToRemove = await this.motherRepository.findOneBy({ id });

    if (!motherToRemove) {
      return "this mother not exist";
    }

    await this.motherRepository.remove(motherToRemove);

    return "mother has been removed";
  }
}
