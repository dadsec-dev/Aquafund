import { Request, Response, NextFunction } from "express";

/**
 * Middleware factory to check if the authenticated user has one of the specified roles
 * Must be used after requireAuth middleware
 * 
 * @param allowedRoles - Array of roles that are allowed to access the route
 * @returns Express middleware function
 * 
 * @example
 * router.get('/admin-only', requireAuth, requireRole(['ADMIN']), handler);
 * router.get('/admin-or-ngo', requireAuth, requireRole(['ADMIN', 'NGO']), handler);
 */
export function requireRole(allowedRoles: string[]) {
  return (req: Request, res: Response, next: NextFunction): void => {
    // Check if user is authenticated (should be set by requireAuth middleware)
    if (!req.user) {
      res.status(401).json({
        success: false,
        message: "Unauthorized - Authentication required",
      });
      return;
    }

    // Check if user's role is in the allowed roles
    if (!allowedRoles.includes(req.user.role)) {
      res.status(403).json({
        success: false,
        message: `Forbidden - Required role: ${allowedRoles.join(" or ")}`,
      });
      return;
    }

    next();
  };
}

