"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = requireAdmin;
/**
 * Middleware to check if the authenticated user has ADMIN role
 * Must be used after requireAuth middleware
 */
function requireAdmin(req, res, next) {
    // Check if user is authenticated (should be set by requireAuth middleware)
    if (!req.user) {
        res.status(401).json({
            success: false,
            message: "Unauthorized - Authentication required",
        });
        return;
    }
    // Check if user has ADMIN role
    if (req.user.role !== "ADMIN") {
        res.status(403).json({
            success: false,
            message: "Forbidden - Admin access required",
        });
        return;
    }
    next();
}
