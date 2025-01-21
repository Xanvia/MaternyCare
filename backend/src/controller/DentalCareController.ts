// import { Request, Response, NextFunction } from "express";
// import { getRepository } from "typeorm";
// import { Mother } from "../entity/Mother";
// import { User } from "../entity/User";
// import { Phm } from "../entity/Phm";

// class DentalCareController {
//   private motherRepository = getRepository(Mother);
//   private userRepository = getRepository(User);
//   private phmRepository = getRepository(Phm);

//   async updateDentalCare(
//     request: Request,
//     response: Response,
//     next: NextFunction
//   ) {
//     const id = parseInt(request.params.id);
//     const { referred_date, examination_date, treatment, dentistsignature } =
//       request.body;

//     const userId = request.user?.userId;

//     try {
//       const mother = await this.motherRepository.findOne({
//         where: { id },
//         relations: ["user", "phm"],
//       });

//       if (!mother) {
//         return response.status(404).json({ message: "Mother not found" });
//       }

//       // Update the mother's dental care details
//       mother.referred_date = referred_date ?? mother.referred_date;
//       mother.examination_date = examination_date ?? mother.examination_date;
//       mother.treatment = treatment ?? mother.treatment;
//       mother.dentistsignature = dentistsignature ?? mother.dentistsignature;

//       console.log("phm ", userId);
//       if (userId) {
//         const user = await this.userRepository.findOne({
//           where: { id: userId },
//         });
//         const phm = await this.phmRepository.findOne({
//           where: { user },
//           relations: ["user"],
//         });
//         if (!phm) {
//           return response.status(404).json({ message: "PHM not found" });
//         }
//         mother.phm = phm; // Update the PHM relationship
//       }

//       await this.motherRepository.save(mother);
//       response.send(mother);
//       return;
//     } catch (error) {
//       return next(error);
//     }
//   }

//   async getDentalCare(
//     request: Request,
//     response: Response,
//     next: NextFunction
//   ) {
//     const id = parseInt(request.params.id);

//     try {
//       const mother = await this.motherRepository.findOne({
//         where: { id },
//         relations: ["user", "phm"],
//       });

//       if (!mother) {
//         return response.status(404).json({ message: "Mother not found" });
//       }

//       response.send(mother);
//       return;
//     } catch (error) {
//       return next(error);
//     }
//   }
// }

// export default DentalCareController;
