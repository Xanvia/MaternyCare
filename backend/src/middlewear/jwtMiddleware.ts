import { NextFunction, Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import * as dotenv from "dotenv";

dotenv.config();

// Add a custom property 'user' to the 'Request' type definition
declare global {
  namespace Express {
    interface Request {
      user: any;
    }
  }
}

export function jwtMiddleware(
  request: Request,
  response: Response,
  next: NextFunction
) {
  const token = request.headers.authorization;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Attach the decoded data to the request object
    request.user = decoded;

    next();
  } catch (err) {
    response.status(401).json({ message: "Invalid token" });
  }
}
