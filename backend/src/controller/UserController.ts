import { AppDataSource } from "../data-source";
import { NextFunction, Request, Response } from "express";
import { User, UserRole } from "../entity/User";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";
// import * as dotenv from "dotenv";
import { Phm } from "../entity/Phm";
import { Moh } from "../entity/Moh";
import { Mother } from "../entity/Mother";

// dotenv.config();
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
    const { firstName, lastName, email, password, role, isVerified } =
      request.body;

    try {
      // Hash the password
      const hashedPassword = await bcrypt.hash(password, 10);

      // Create and save the user
      const user = Object.assign(new User(), {
        firstName,
        lastName,
        email,
        password: hashedPassword,
        isVerified,
        role,
      });
      const savedUser = await this.userRepository.save(user);

      // Generate a JWT
      const token = jwt.sign(
        { userId: savedUser.id, userRole: savedUser.role },
        process.env.JWT_SECRET!
      );

      // Return user and token
      response.send({ user: savedUser, token });
    } catch (error) {
      console.error("Error creating user :", error);
      response.status(500).json({ message: "Internal server error" });
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

  async updateUser(request: Request, response: Response, next: NextFunction) {
    const id = parseInt(request.params.id);
    const { firstName, lastName, email, password, role } = request.body;

    const userToUpdate = await this.userRepository.findOneBy({ id });

    if (!userToUpdate) {
      return "this user not exist";
    }

    if (firstName) {
      userToUpdate.firstName = firstName;
    }

    if (lastName) {
      userToUpdate.lastName = lastName;
    }

    if (email) {
      userToUpdate.email = email;
    }

    if (password) {
      const hashedPassword = await bcrypt.hash(password, 10);
      userToUpdate.password = hashedPassword;
    }

    if (role) {
      userToUpdate.role = role;
    }

    await this.userRepository.save(userToUpdate);

    return "user has been updated";
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
