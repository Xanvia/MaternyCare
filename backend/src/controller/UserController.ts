import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User, UserRole } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";
import { Phm } from "../entity/Phm";
import { Moh } from "../entity/Moh";
import { Mother } from "../entity/Mother";

dotenv.config();
export class UserController {
  // private userRepository = AppDataSource.getRepository(User);
  private userRepository = AppDataSource.getRepository(User);
  private phmRepository = AppDataSource.getRepository(Phm);
  private mohRepository = AppDataSource.getRepository(Moh);
  private motherRepository = AppDataSource.getRepository(Mother);

  async getAllUsers(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }

  async getOneUser(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  // async createUser(request: Request, response: Response, next: NextFunction) {
  //   const { firstName, lastName, email, password, role } = request.body;

  //   const hashedPassword = await bcrypt.hash(password, 10);

  //   const user = Object.assign(new User(), {
  //     firstName,
  //     lastName,
  //     email,
  //     password: hashedPassword,
  //     role,
  //   });

  //   const savedUser = await this.userRepository.save(user);

  //   const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET);

  //   return { user: savedUser, token };
  // }
  async createUser(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, password, role } = request.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const user = Object.assign(new User(), {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        role,
      });
      const savedUser = await this.userRepository.save(user);

      // Create role-specific entity if needed
      if (role === UserRole.PHM) {
        const phm = new Phm();
        phm.user = savedUser;
        // Set other PHM-specific fields here
        await this.phmRepository.save(phm);
      } else if (role === UserRole.MOH) {
        const moh = new Moh();
        moh.user = savedUser;
        // Set other MOH-specific fields here
        await this.mohRepository.save(moh);
      } else if (role === UserRole.MOTHER) {
        const mother = new Mother();
        mother.user = savedUser;
        // Set other Mother-specific fields here
        await this.motherRepository.save(mother);
      }

      // Generate a JWT
      const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET!);

      // Return user and token
      return response.status(201).json({ user: savedUser, token });
    } catch (error) {
      console.error("Error creating user:", error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body;

      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        response.status(400).json({ message: "Email does not exist" });
        return;
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        response.status(400).json({ message: "Password is incorrect" });
        return;
      }

      // Generate a JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      // Return only necessary user details and token
      const userResponse = {
        id: user.id,
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        role: user.role,
      };

      response.json({ user: userResponse, token });
    } catch (error) {
      console.error("Login error:", error);
      response.status(500).json({ message: "Internal server error" });
    }
  }

  async removeUser(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
