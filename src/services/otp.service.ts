import { PrismaClient } from "@prisma/client";
import { generateOTP } from "../utils/generateOTP";
import { mailer } from "../config/mailer";

const prisma = new PrismaClient();

export class OTPService {
  static async sendOTP(email: string) {
    const otpcode = generateOTP();
    // Save OTP
    await prisma.otp.create({
      data: {
        email,
        code: otpcode,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
    // Send email
    await mailer.sendMail({
      from: `Your App <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Your Verification Code",
      html: `<p>Use this code to verify your account:</p><h2>${otpcode}</h2><p>This code expires in 5 minutes.</p>`,
    });
    return true;
  }

  static async verifyOTP(email: string, otp: string) {
    const record = await prisma.otp.findFirst({ where: { email, code: otp } });
    if (!record) return { valid: false, message: "Invalid code" };
    if (record.expiresAt < new Date()) return { valid: false, message: "Code expired" };
    await prisma.otp.delete({ where: { id: record.id } });
    return { valid: true };
  }

  static async sendPasswordResetOTP(email: string) {
    const otpcode = generateOTP();
    // Save OTP
    await prisma.otp.create({
      data: {
        email,
        code: otpcode,
        expiresAt: new Date(Date.now() + 5 * 60 * 1000),
      },
    });
    // Send email
    await mailer.sendMail({
      from: `Your App <${process.env.MAIL_USER}>`,
      to: email,
      subject: "Password Reset Code",
      html: `<p>Use this code to reset your password:</p><h2>${otpcode}</h2><p>This code expires in 5 minutes.</p>`,
    });
    return true;
  }
}
