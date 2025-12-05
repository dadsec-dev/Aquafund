"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Web3AuthController = void 0;
const web3Auth_service_1 = require("../services/web3Auth.service");
class Web3AuthController {
    /**
     * POST /api/auth/challenge
     * Request a nonce for signing
     */
    static async getChallenge(req, res) {
        try {
            const { address } = req.body;
            if (!address) {
                return res.status(400).json({
                    success: false,
                    error: "Wallet address is required",
                });
            }
            // Validate address format (basic check)
            if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid wallet address format",
                });
            }
            const challenge = await web3Auth_service_1.Web3AuthService.generateChallenge(address);
            return res.json({
                success: true,
                data: challenge,
            });
        }
        catch (error) {
            console.error("Challenge generation error:", error);
            return res.status(500).json({
                success: false,
                error: error.message || "Failed to generate challenge",
            });
        }
    }
    /**
     * POST /api/auth/verify
     * Verify signature and issue JWT token
     */
    static async verifySignature(req, res) {
        try {
            const { address, signature, message } = req.body;
            if (!address || !signature || !message) {
                return res.status(400).json({
                    success: false,
                    error: "Address, signature, and message are required",
                });
            }
            // Validate address format
            if (!/^0x[a-fA-F0-9]{40}$/.test(address)) {
                return res.status(400).json({
                    success: false,
                    error: "Invalid wallet address format",
                });
            }
            const result = await web3Auth_service_1.Web3AuthService.verifySignature(address, signature, message);
            return res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            console.error("Signature verification error:", error);
            return res.status(401).json({
                success: false,
                error: error.message || "Signature verification failed",
            });
        }
    }
    /**
     * POST /api/auth/refresh
     * Refresh an expired or expiring JWT token
     */
    static async refreshToken(req, res) {
        try {
            const authHeader = req.headers.authorization;
            if (!authHeader || !authHeader.startsWith("Bearer ")) {
                return res.status(401).json({
                    success: false,
                    error: "No token provided",
                });
            }
            const token = authHeader.substring(7);
            const result = await web3Auth_service_1.Web3AuthService.refreshToken(token);
            return res.json({
                success: true,
                data: result,
            });
        }
        catch (error) {
            console.error("Token refresh error:", error);
            return res.status(401).json({
                success: false,
                error: error.message || "Token refresh failed",
            });
        }
    }
    /**
     * GET /api/auth/me
     * Get current user info from token
     */
    static async getCurrentUser(req, res) {
        try {
            // User info is attached by requireAuth middleware
            if (!req.user) {
                return res.status(401).json({
                    success: false,
                    error: "Not authenticated",
                });
            }
            // If it's a Web3 user, fetch additional info
            if (req.user.address) {
                const userInfo = await web3Auth_service_1.Web3AuthService.getUserByWallet(req.user.address);
                return res.json({
                    success: true,
                    data: userInfo,
                });
            }
            // For traditional auth users
            return res.json({
                success: true,
                data: {
                    userId: req.user.userId,
                    email: req.user.email,
                    role: req.user.role,
                },
            });
        }
        catch (error) {
            console.error("Get current user error:", error);
            return res.status(500).json({
                success: false,
                error: error.message || "Failed to get user info",
            });
        }
    }
}
exports.Web3AuthController = Web3AuthController;
