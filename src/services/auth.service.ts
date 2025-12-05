import { PrismaClient } from "@prisma/client";
import { OTPService } from "./otp.service";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const prisma = new PrismaClient();

export class AuthService {
  static async sendVerificationEmail(email: string) {
    const user = await prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User does not exist");

    await OTPService.sendOTP(user.email);
    return "OTP sent successfully";
  }

  static async verifyAccount(email: string, otp: string) {
    const result = await OTPService.verifyOTP(email, otp);
    if (!result.valid) throw new Error(result.message);

    await prisma.user.update({
      where: { email },
      data: { status: "APPROVED" },
    });

    return "Account verified successfully";
  }

  static async login(email: string, password: string) {
    // Trim email and password for consistency
    const trimmedEmail = email.trim();
    const trimmedPassword = password.trim();

    // Find user by email with NGO relation included
    const user = await prisma.user.findUnique({ 
      where: { email: trimmedEmail },
      include: { ngos: true }
    });
    if (!user) throw new Error("Invalid email or password");

    // Check if account is approved
    if (user.status !== "APPROVED") {
      throw new Error("Account not verified. Please verify your email first.");
    }

    // Verify password
    const isPasswordValid = await bcrypt.compare(trimmedPassword, user.password);
    if (!isPasswordValid) throw new Error("Invalid email or password");

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email, role: user.role },
      process.env.JWT_SECRET || "your-secret-key",
      { expiresIn: "7d" }
    );

    // Return user data (without password) and token
    const { password: _, ngos, ...userWithoutPassword } = user;
    
    // Include NGO data - always include ngo field, null if no NGO exists
    const response: any = {
      user: userWithoutPassword,
      token,
    };

    // Always include ngo field, set to null if user doesn't have NGOs
    if (user.role === "NGO") {
      response.ngo = ngos && ngos.length > 0 ? ngos[0] : null;
    } else {
      response.ngo = null;
    }

    return response;
  }

  static async forgotPassword(email: string) {
    const trimmedEmail = email.trim();
    
    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (!user) throw new Error("User does not exist");

    // Send OTP for password reset
    await OTPService.sendPasswordResetOTP(trimmedEmail);
    return "Password reset OTP sent successfully";
  }

  static async resetPassword(email: string, otp: string, newPassword: string) {
    const trimmedEmail = email.trim();
    const trimmedPassword = newPassword.trim();

    // Verify OTP
    const result = await OTPService.verifyOTP(trimmedEmail, otp);
    if (!result.valid) throw new Error(result.message);

    // Find user by email
    const user = await prisma.user.findUnique({ where: { email: trimmedEmail } });
    if (!user) throw new Error("User does not exist");

    // Hash new password
    const hashedPassword = await bcrypt.hash(trimmedPassword, 10);

    // Update password
    await prisma.user.update({
      where: { email: trimmedEmail },
      data: { password: hashedPassword },
    });

    return "Password reset successfully";
  }
}
