import { Request, Response, NextFunction } from "express";
import admin from "../config/firebase";
import { CustomError } from "./errorHandler";
import User from "../models/MONGO/User";
import * as Types from "../Types";

// Extend Express Request type to include user property
declare global {
  namespace Express {
    interface Request {
      user?: admin.auth.DecodedIdToken;
      dbUser?: Types.IUser;
    }
  }
}

/**
 * Authentication middleware to verify Firebase ID tokens
 */
export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
      throw new CustomError("No authentication token provided", 401);
    }

    if (!authHeader.startsWith("Bearer ")) {
      throw new CustomError("Invalid token format", 401);
    }

    // Extract the token from the Authorization header
    const idToken = authHeader.split("Bearer ")[1];

    // Verify the ID token
    const decodedToken = await admin.auth().verifyIdToken(idToken);

    // Attach the decoded token to the request object
    const user = await User.findOne({ uid: decodedToken.uid });

    if (!user) {
      throw new CustomError("User not found", 401);
    }

    req.user = decodedToken;
    req.dbUser = user;

    next();
  } catch (error: any) {
    if (error instanceof CustomError) {
      next(error);
    } else {
      // Firebase auth errors
      next(new CustomError("Invalid authentication token", 401));
    }
  }
};

export const authorize = (allowedRoles: string[]) => {
  return (req: Request, res: Response, next: NextFunction) => {
    if (!req.dbUser) {
      return next(new CustomError("User not authenticated", 401));
    }

    // Check if the user has the required role
    const userRole = req.dbUser.role || "";

    // Check if the user has any of the allowed roles
    const hasRole = allowedRoles.includes(userRole);

    if (!hasRole) {
      return next(new CustomError("Unauthorized access", 403));
    }

    next();
  };
};
