"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthService = void 0;
const client_1 = require("@prisma/client");
const otp_service_1 = require("./otp.service");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const prisma = new client_1.PrismaClient();
class AuthService {
    static async sendVerificationEmail(email) {
        const user = await prisma.user.findUnique({ where: { email } });
        if (!user)
            throw new Error("User does not exist");
        await otp_service_1.OTPService.sendOTP(user.email);
        return "OTP sent successfully";
    }
    static async verifyAccount(email, otp) {
        const result = await otp_service_1.OTPService.verifyOTP(email, otp);
        if (!result.valid)
            throw new Error(result.message);
        await prisma.user.update({
            where: { email },
            data: { status: "APPROVED" },
        });
        return "Account verified successfully";
    }
    static async login(email, password) {
        // Trim email and password for consistency
        const trimmedEmail = email.trim();
        const trimmedPassword = password.trim();
        // Find user by email
        const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });
        if (!user)
            throw new Error("Invalid email or password");
        // Check if account is approved
        if (user.status !== "APPROVED") {
            throw new Error("Account not verified. Please verify your email first.");
        }
        // Verify password
        const isPasswordValid = await bcryptjs_1.default.compare(trimmedPassword, user.password);
        if (!isPasswordValid)
            throw new Error("Invalid email or password");
        // Generate JWT token
        const token = jsonwebtoken_1.default.sign({ userId: user.id, email: user.email, role: user.role }, process.env.JWT_SECRET || "your-secret-key", { expiresIn: "7d" });
        // Return user data (without password) and token
        const { password: _, ...userWithoutPassword } = user;
        return {
            user: userWithoutPassword,
            token,
        };
    }
    static async forgotPassword(email) {
        const trimmedEmail = email.trim();
        // Find user by email
        const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });
        if (!user)
            throw new Error("User does not exist");
        // Send OTP for password reset
        await otp_service_1.OTPService.sendPasswordResetOTP(trimmedEmail);
        return "Password reset OTP sent successfully";
    }
    static async resetPassword(email, otp, newPassword) {
        const trimmedEmail = email.trim();
        const trimmedPassword = newPassword.trim();
        // Verify OTP
        const result = await otp_service_1.OTPService.verifyOTP(trimmedEmail, otp);
        if (!result.valid)
            throw new Error(result.message);
        // Find user by email
        const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });
        if (!user)
            throw new Error("User does not exist");
        // Hash new password
        const hashedPassword = await bcryptjs_1.default.hash(trimmedPassword, 10);
        // Update password
        await prisma.user.update({
            where: { email: trimmedEmail },
            data: { password: hashedPassword },
        });
        return "Password reset successfully";
    }
}
exports.AuthService = AuthService;
