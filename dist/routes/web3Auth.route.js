"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const web3Auth_controller_1 = require("../controllers/web3Auth.controller");
const requireAuth_1 = __importDefault(require("../middleware/auth/requireAuth"));
const router = (0, express_1.Router)();
/**
 * @swagger
 * /api/auth/challenge:
 *   post:
 *     summary: Request a nonce for Web3 authentication
 *     tags: [Web3 Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *             properties:
 *               address:
 *                 type: string
 *                 pattern: ^0x[a-fA-F0-9]{40}$
 *                 example: "0x1234567890123456789012345678901234567890"
 *                 description: Ethereum wallet address
 *     responses:
 *       200:
 *         description: Challenge generated successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     nonce:
 *                       type: string
 *                       example: "abc123def456..."
 *                       description: Random nonce to be included in SIWE message
 *                     issuedAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:00:00.000Z"
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-01T00:15:00.000Z"
 *       400:
 *         description: Invalid request
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid wallet address format"
 */
router.post("/challenge", web3Auth_controller_1.Web3AuthController.getChallenge);
/**
 * @swagger
 * /api/auth/verify:
 *   post:
 *     summary: Verify SIWE signature and get JWT token
 *     tags: [Web3 Auth]
 *     security: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - address
 *               - signature
 *               - message
 *             properties:
 *               address:
 *                 type: string
 *                 pattern: ^0x[a-fA-F0-9]{40}$
 *                 example: "0x1234567890123456789012345678901234567890"
 *               signature:
 *                 type: string
 *                 example: "0xabcdef..."
 *                 description: Signed SIWE message
 *               message:
 *                 type: string
 *                 example: "localhost:3001 wants you to sign in with your Ethereum account:\n0x1234...\n\nSign in to AquaFund Admin Dashboard\n\nURI: http://localhost:3001\nVersion: 1\nChain ID: 1\nNonce: abc123...\nIssued At: 2024-01-01T00:00:00.000Z"
 *                 description: The complete SIWE message that was signed
 *     responses:
 *       200:
 *         description: Authentication successful
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                       description: JWT token for authenticated requests
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-02T00:00:00.000Z"
 *                     address:
 *                       type: string
 *                       example: "0x1234567890123456789012345678901234567890"
 *                     role:
 *                       type: string
 *                       enum: [USER, ADMIN, NGO]
 *                       example: "ADMIN"
 *       401:
 *         description: Authentication failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Signature verification failed"
 */
router.post("/verify", web3Auth_controller_1.Web3AuthController.verifySignature);
/**
 * @swagger
 * /api/auth/refresh:
 *   post:
 *     summary: Refresh an expired or expiring JWT token
 *     tags: [Web3 Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Token refreshed successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     token:
 *                       type: string
 *                       example: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
 *                     expiresAt:
 *                       type: string
 *                       format: date-time
 *                       example: "2024-01-03T00:00:00.000Z"
 *                     address:
 *                       type: string
 *                       example: "0x1234567890123456789012345678901234567890"
 *                     role:
 *                       type: string
 *                       example: "ADMIN"
 *       401:
 *         description: Token refresh failed
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: false
 *                 error:
 *                   type: string
 *                   example: "Invalid token"
 */
router.post("/refresh", web3Auth_controller_1.Web3AuthController.refreshToken);
/**
 * @swagger
 * /api/auth/me:
 *   get:
 *     summary: Get current authenticated user info
 *     tags: [Web3 Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User info retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 success:
 *                   type: boolean
 *                   example: true
 *                 data:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                     walletAddress:
 *                       type: string
 *                     role:
 *                       type: string
 *                     status:
 *                       type: string
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *       401:
 *         description: Not authenticated
 */
router.get("/me", requireAuth_1.default, web3Auth_controller_1.Web3AuthController.getCurrentUser);
exports.default = router;
