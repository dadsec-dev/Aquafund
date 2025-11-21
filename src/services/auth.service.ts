import { PrismaClient } from "@prisma/client";
import { OTPService } from "./otp.service";

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
}
