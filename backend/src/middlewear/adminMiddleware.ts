import { Request, Response, NextFunction } from "express";

export function adminMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  if (req.user && req.user.role === "admin") {
    next();
  } else {
    res.status(403).json({
      message: "Forbidden: You do not have the necessary permissions",
    });
  }
}
