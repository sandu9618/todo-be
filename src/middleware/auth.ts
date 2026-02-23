import { Request, Response, NextFunction } from "express";
import jwt from 'jsonwebtoken';

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
  try {
    const header = req.headers.authorization;
  
    if (!header) {
      return res.status(401).json({message: "No authorization header"});
    }
  
    const token = header.split(" ")[1];
  
    if (!token) {
      return res.status(401).json({message: "No token found"})
    }
  
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as JwtPayload;
  
    (req as any).user = {id: decoded.id};
    (req as any).role = {role: decoded.role};
  
    next();
  } catch (error) {
    return res.status(401).json({message: "Invalid or expired token"})
  }
}

export const hasAccess = (requiredRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      const role = (req as any).role?.role;
      if (!role) {
        return res.status(403).json({message: "Forbidden"})
      }
      if (!requiredRoles.includes(role)) {
        return res.status(403).json({message: "Forbidden"})
      }
      next();
    } catch (error) {
      return res.status(403).json({message: "Forbidden"})
    }
  }
}