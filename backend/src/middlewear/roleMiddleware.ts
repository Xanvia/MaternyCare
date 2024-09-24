import { Request, Response, NextFunction } from "express";

export function roleMiddleware(requiredRole: string) {
  return (req: Request, res: Response, next: NextFunction) => {
    if (req.user && req.user.userRole === requiredRole) {
      next();
    } else {
      res.status(403).json({ message: "Forbidden" });
    }
  };
}
