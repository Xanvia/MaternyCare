import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();
export class UserController {
  private userRepository = AppDataSource.getRepository(User);

  async all(request: Request, response: Response, next: NextFunction) {
    return this.userRepository.find();
  }
  // async all(request: Request, response: Response, next: NextFunction) {
  //   const users = await this.userRepository.find();
  //   return users.map((user) => ({
  //     id: user.id,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     role: user.role,
  //   }));
  // }

  async one(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    const user = await this.userRepository.findOne({
      where: { id },
    });

    if (!user) {
      return "unregistered user";
    }
    return user;
  }

  // async one(request: Request, response: Response, next: NextFunction) {
  //   const id = parseInt(request.params.id);

  //   const user = await this.userRepository.findOne({
  //     where: { id },
  //   });

  //   if (!user) {
  //     return "unregistered user";
  //   }
  //   return {
  //     id: user.id,
  //     firstName: user.firstName,
  //     lastName: user.lastName,
  //     email: user.email,
  //     role: user.role,
  //   };
  // }

  async save(request: Request, response: Response, next: NextFunction) {
    const { firstName, lastName, email, password, role } = request.body;

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = Object.assign(new User(), {
      firstName,
      lastName,
      email,
      password: hashedPassword,
      role,
    });

    const savedUser = await this.userRepository.save(user);

    const token = jwt.sign({ userId: savedUser.id }, process.env.JWT_SECRET);

    return { user: savedUser, token };
  }

  // async save(request: Request, response: Response, next: NextFunction) {
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

  //   return {
  //     user: {
  //       id: savedUser.id,
  //       firstName: savedUser.firstName,
  //       lastName: savedUser.lastName,
  //       email: savedUser.email,
  //       role: savedUser.role,
  //     },
  //     token,
  //   };
  // }

  async login(request: Request, response: Response, next: NextFunction) {
    try {
      const { email, password } = request.body;

      const user = await this.userRepository.findOne({ where: { email } });

      if (!user) {
        return response.status(400).json({ message: "Email does not exist" });
      }

      const passwordMatch = await bcrypt.compare(password, user.password);

      if (!passwordMatch) {
        return response.status(400).json({ message: "Password is incorrect" });
      }

      // Generate a JWT
      const token = jwt.sign({ userId: user.id }, process.env.JWT_SECRET);

      return { user: user, token };
    } catch (error) {
      console.log(error);
      return response.status(500).json({ message: "Internal server error" });
    }
  }

  async remove(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);

    let userToRemove = await this.userRepository.findOneBy({ id });

    if (!userToRemove) {
      return "this user not exist";
    }

    await this.userRepository.remove(userToRemove);

    return "user has been removed";
  }
}
