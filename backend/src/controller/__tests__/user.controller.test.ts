// src/controller/__tests__/user.controller.test.ts
import { UserController } from "../UserController";
import { AppDataSource } from "../../data-source";
import { User, UserRole } from "../../entity/User";
import { Request, Response, NextFunction } from "express";
import * as bcrypt from "bcrypt";
import * as jwt from "jsonwebtoken";

// Mock the dependencies
jest.mock("../../data-source");
jest.mock("bcrypt");
jest.mock("jsonwebtoken");

describe("UserController", () => {
  let userController: UserController;
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let mockNext: NextFunction;
  let mockUserRepository: any;

  beforeEach(() => {
    // Reset mocks
    mockUserRepository = {
      find: jest.fn(),
      findOne: jest.fn(),
      findOneBy: jest.fn(),
      save: jest.fn(),
      remove: jest.fn(),
    };

    // Mock AppDataSource.getRepository
    (AppDataSource.getRepository as jest.Mock).mockReturnValue(mockUserRepository);

    userController = new UserController();
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
      send: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("getAllUsers", () => {
    it("should return all users", async () => {
      const mockUsers = [
        { id: 1, firstName: "John" },
        { id: 2, firstName: "Jane" },
      ];
      mockUserRepository.find.mockResolvedValue(mockUsers);

      const result = await userController.getAllUsers(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toEqual(mockUsers);
      expect(mockUserRepository.find).toHaveBeenCalled();
    });
  });

  describe("getOneUser", () => {
    it("should return one user when exists", async () => {
      const mockUser = { id: 1, firstName: "John" };
      mockRequest = {
        params: { id: "1" },
      };
      mockUserRepository.findOne.mockResolvedValue(mockUser);

      const result = await userController.getOneUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toEqual(mockUser);
      expect(mockUserRepository.findOne).toHaveBeenCalledWith({
        where: { id: 1 },
      });
    });

    it('should return "unregistered user" when user does not exist', async () => {
      mockRequest = {
        params: { id: "999" },
      };
      mockUserRepository.findOne.mockResolvedValue(null);

      const result = await userController.getOneUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toBe("unregistered user");
    });
  });

  describe("createUser", () => {
    it("should create a new user successfully", async () => {
      const mockRequest = {
        body: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "password123",
          role: UserRole.MOTHER,
        },
      };

      const hashedPassword = "hashedPassword123";
      const mockToken = "mockToken123";
      const savedUser = { ...mockRequest.body, id: 1, password: hashedPassword };

      (bcrypt.hash as jest.Mock).mockResolvedValue(hashedPassword);
      mockUserRepository.save.mockResolvedValue(savedUser);
      (jwt.sign as jest.Mock).mockReturnValue(mockToken);

      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.send).toHaveBeenCalledWith({
        user: savedUser,
        token: mockToken,
      });
    });

    it("should handle errors during user creation", async () => {
      const mockRequest = {
        body: {
          firstName: "John",
          lastName: "Doe",
          email: "john@example.com",
          password: "password123",
          role: UserRole.MOTHER,
        },
      };

      mockUserRepository.save.mockRejectedValue(new Error("Database error"));

      await userController.createUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(500);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Internal server error",
      });
    });
  });

  describe("login", () => {
    it("should login successfully with correct credentials", async () => {
      const mockUser = {
        id: 1,
        email: "john@example.com",
        password: "hashedPassword",
        firstName: "John",
        lastName: "Doe",
        role: UserRole.MOTHER,
        isVerified: true,
      };

      mockRequest = {
        body: {
          email: "john@example.com",
          password: "password123",
        },
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(true);
      (jwt.sign as jest.Mock).mockReturnValue("mockToken");

      await userController.login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.json).toHaveBeenCalledWith({
        user: {
          id: mockUser.id,
          email: mockUser.email,
          firstName: mockUser.firstName,
          lastName: mockUser.lastName,
          role: mockUser.role,
          isVerified: mockUser.isVerified,
        },
        token: "mockToken",
      });
    });

    it("should handle non-existent email", async () => {
      mockRequest = {
        body: {
          email: "nonexistent@example.com",
          password: "password123",
        },
      };

      mockUserRepository.findOne.mockResolvedValue(null);

      await userController.login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Email does not exist",
      });
    });

    it("should handle incorrect password", async () => {
      const mockUser = {
        id: 1,
        email: "john@example.com",
        password: "hashedPassword",
      };

      mockRequest = {
        body: {
          email: "john@example.com",
          password: "wrongpassword",
        },
      };

      mockUserRepository.findOne.mockResolvedValue(mockUser);
      (bcrypt.compare as jest.Mock).mockResolvedValue(false);

      await userController.login(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(400);
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: "Password is incorrect",
      });
    });
  });

  describe("updateUser", () => {
    it("should update user details successfully", async () => {
      const mockUser = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: UserRole.MOTHER,
      };

      mockRequest = {
        params: { id: "1" },
        body: {
          firstName: "Johnny",
          lastName: "Doe",
          email: "johnny@example.com",
          password: "newpassword123",
          role: UserRole.ADMIN,
        },
      };

      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      (bcrypt.hash as jest.Mock).mockResolvedValue("newHashedPassword");
      mockUserRepository.save.mockResolvedValue({
        ...mockUser,
        ...mockRequest.body,
        password: "newHashedPassword",
      });

      const result = await userController.updateUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toBe("user has been updated");
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        ...mockRequest.body,
        password: "newHashedPassword",
      });
    });

    it("should return error message if user does not exist", async () => {
      mockRequest = {
        params: { id: "999" },
        body: {
          firstName: "Johnny",
          lastName: "Doe",
          email: "johnny@example.com",
          password: "newpassword123",
          role: UserRole.ADMIN,
        },
      };

      mockUserRepository.findOneBy.mockResolvedValue(null);

      const result = await userController.updateUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toBe("this user not exist");
    });
  });

  describe("verifyUser", () => {
    it("should verify user successfully", async () => {
      const mockUser = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: UserRole.MOTHER,
        isVerified: false,
      };

      mockRequest = {
        params: { id: "1" },
      };

      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockUserRepository.save.mockResolvedValue({
        ...mockUser,
        isVerified: true,
      });

      const result = await userController.verifyUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toBe("user has been verified");
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockUserRepository.save).toHaveBeenCalledWith({
        ...mockUser,
        isVerified: true,
      });
    });

    it("should return error message if user does not exist", async () => {
      mockRequest = {
        params: { id: "999" },
      };

      mockUserRepository.findOneBy.mockResolvedValue(null);

      const result = await userController.verifyUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toBe("this user not exist");
    });
  });

  describe("removeUser", () => {
    it("should remove user successfully", async () => {
      const mockUser = {
        id: 1,
        firstName: "John",
        lastName: "Doe",
        email: "john@example.com",
        password: "hashedPassword",
        role: UserRole.MOTHER,
      };

      mockRequest = {
        params: { id: "1" },
      };

      mockUserRepository.findOneBy.mockResolvedValue(mockUser);
      mockUserRepository.remove.mockResolvedValue(mockUser);

      const result = await userController.removeUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toBe("user has been removed");
      expect(mockUserRepository.findOneBy).toHaveBeenCalledWith({ id: 1 });
      expect(mockUserRepository.remove).toHaveBeenCalledWith(mockUser);
    });

    it("should return error message if user does not exist", async () => {
      mockRequest = {
        params: { id: "999" },
      };

      mockUserRepository.findOneBy.mockResolvedValue(null);

      const result = await userController.removeUser(
        mockRequest as Request,
        mockResponse as Response,
        mockNext
      );

      expect(result).toBe("this user not exist");
    });
  });
});