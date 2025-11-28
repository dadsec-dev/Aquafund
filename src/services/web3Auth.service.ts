import { PrismaClient } from "@prisma/client";
import { SiweMessage } from "siwe";
import jwt from "jsonwebtoken";
import crypto from "crypto";

const prisma = new PrismaClient();

export class Web3AuthService {
  /**
   * Generate a nonce for a wallet address
   * The nonce is used to prevent replay attacks
   */
  static async generateChallenge(address: string) {
    // Normalize address to lowercase
    const normalizedAddress = address.toLowerCase();

    // Generate a cryptographically secure random nonce
    const nonce = crypto.randomBytes(32).toString("hex");
    const issuedAt = new Date();
    const expiresAt = new Date(issuedAt.getTime() + 15 * 60 * 1000); // 15 minutes

    // Find or create user with this wallet address
    let user = await prisma.user.findUnique({
      where: { walletAddress: normalizedAddress },
    });

    if (!user) {
      // Create a new user with wallet address
      // For admin users, we'll set their role based on environment config
      const adminWallets = (process.env.ADMIN_WALLETS || "")
        .split(",")
        .map((w) => w.trim().toLowerCase())
        .filter((w) => w.length > 0);

      const role = adminWallets.includes(normalizedAddress) ? "ADMIN" : "USER";

      user = await prisma.user.create({
        data: {
          walletAddress: normalizedAddress,
          email: `${normalizedAddress}@wallet.local`, // Placeholder email
          password: "", // No password for Web3 auth
          role: role,
          status: "APPROVED", // Auto-approve wallet users
          nonce,
          nonceIssuedAt: issuedAt,
          nonceExpiresAt: expiresAt,
        },
      });
    } else {
      // Update existing user with new nonce
      user = await prisma.user.update({
        where: { walletAddress: normalizedAddress },
        data: {
          nonce,
          nonceIssuedAt: issuedAt,
          nonceExpiresAt: expiresAt,
        },
      });
    }

    return {
      nonce,
      issuedAt: issuedAt.toISOString(),
      expiresAt: expiresAt.toISOString(),
    };
  }

  /**
   * Verify a SIWE signature and issue a JWT token
   */
  static async verifySignature(
    address: string,
    signature: string,
    message: string
  ) {
    const normalizedAddress = address.toLowerCase();

    // Find user with this wallet address
    const user = await prisma.user.findUnique({
      where: { walletAddress: normalizedAddress },
    });

    if (!user) {
      throw new Error("User not found. Please request a challenge first.");
    }

    // Check if nonce exists and hasn't expired
    if (!user.nonce || !user.nonceExpiresAt) {
      throw new Error("No valid nonce found. Please request a new challenge.");
    }

    if (new Date() > user.nonceExpiresAt) {
      throw new Error("Nonce has expired. Please request a new challenge.");
    }

    // Verify the SIWE message
    try {
      const siweMessage = new SiweMessage(message);
      const fields = await siweMessage.verify({ signature });

      // Verify the address matches
      if (fields.data.address.toLowerCase() !== normalizedAddress) {
        throw new Error("Address mismatch");
      }

      // Verify the nonce matches
      if (fields.data.nonce !== user.nonce) {
        throw new Error("Nonce mismatch");
      }

      // Clear the nonce (one-time use)
      await prisma.user.update({
        where: { walletAddress: normalizedAddress },
        data: {
          nonce: null,
          nonceIssuedAt: null,
          nonceExpiresAt: null,
        },
      });

      // Generate JWT token
      const token = jwt.sign(
        {
          userId: user.id,
          address: normalizedAddress,
          role: user.role,
          authType: "web3",
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      return {
        token,
        expiresAt: expiresAt.toISOString(),
        address: normalizedAddress,
        role: user.role,
      };
    } catch (error: any) {
      throw new Error(`Signature verification failed: ${error.message}`);
    }
  }

  /**
   * Refresh an existing JWT token
   */
  static async refreshToken(oldToken: string) {
    try {
      // Verify the old token (even if expired, we can still decode it)
      const decoded = jwt.verify(
        oldToken,
        process.env.JWT_SECRET || "your-secret-key",
        { ignoreExpiration: true }
      ) as {
        userId: string;
        address: string;
        role: string;
        authType: string;
      };

      // Only refresh Web3 auth tokens
      if (decoded.authType !== "web3") {
        throw new Error("Only Web3 authentication tokens can be refreshed");
      }

      // Verify user still exists and has the same role
      const user = await prisma.user.findUnique({
        where: { id: decoded.userId },
      });

      if (!user) {
        throw new Error("User not found");
      }

      if (user.walletAddress?.toLowerCase() !== decoded.address.toLowerCase()) {
        throw new Error("Wallet address mismatch");
      }

      // Generate new token
      const token = jwt.sign(
        {
          userId: user.id,
          address: user.walletAddress?.toLowerCase(),
          role: user.role,
          authType: "web3",
        },
        process.env.JWT_SECRET || "your-secret-key",
        { expiresIn: "24h" }
      );

      const expiresAt = new Date();
      expiresAt.setHours(expiresAt.getHours() + 24);

      return {
        token,
        expiresAt: expiresAt.toISOString(),
        address: user.walletAddress?.toLowerCase(),
        role: user.role,
      };
    } catch (error: any) {
      if (error.name === "JsonWebTokenError") {
        throw new Error("Invalid token");
      }
      throw error;
    }
  }

  /**
   * Get user info from wallet address
   */
  static async getUserByWallet(address: string) {
    const normalizedAddress = address.toLowerCase();
    const user = await prisma.user.findUnique({
      where: { walletAddress: normalizedAddress },
      select: {
        id: true,
        walletAddress: true,
        role: true,
        status: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return user;
  }
}

