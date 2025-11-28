import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// Extend Express Request type to include user
declare global {
  namespace Express {
    interface Request {
      user?: {
        userId: string;
        email?: string;
        role: string;
        address?: string;
        authType?: string;
      };
    }
  }
}

export default function requireAuth(
  req: Request,
  res: Response,
  next: NextFunction
): void {
  const authorizationHeader = req.headers.authorization;

  if (!authorizationHeader || !authorizationHeader.startsWith("Bearer ")) {
    res.status(401).json({ success: false, message: "Unauthorized - No token provided" });
    return;
  }

  const token = authorizationHeader.substring(7); // Remove "Bearer " prefix

  try {
    const decoded = jwt.verify(
      token,
      process.env.JWT_SECRET || "your-secret-key"
    ) as {
      userId: string;
      email?: string;
      role: string;
      address?: string;
      authType?: string;
    };

    // Attach user info to request object
    // Support both traditional email/password auth and Web3 auth
    req.user = {
      userId: decoded.userId,
      email: decoded.email,
      role: decoded.role,
      address: decoded.address, // For Web3 auth
      authType: decoded.authType, // 'web3' or undefined for traditional
    };

    next();
  } catch (error) {
    res.status(401).json({ success: false, message: "Unauthorized - Invalid or expired token" });
    return;
  }
}


