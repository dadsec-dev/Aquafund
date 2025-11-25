"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.OTPService = void 0;
const client_1 = require("@prisma/client");
const generateOTP_1 = require("../utils/generateOTP");
const mailer_1 = require("../config/mailer");
const prisma = new client_1.PrismaClient();
class OTPService {
    static async sendOTP(email) {
        const otpcode = (0, generateOTP_1.generateOTP)();
        // Save OTP
        await prisma.otp.create({
            data: {
                email,
                code: otpcode,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            },
        });
        // Send email
        await mailer_1.mailer.sendMail({
            from: `Your App <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Your Verification Code",
            html: `<p>Use this code to verify your account:</p><h2>${otpcode}</h2><p>This code expires in 5 minutes.</p>`,
        });
        return true;
    }
    static async verifyOTP(email, otp) {
        const record = await prisma.otp.findFirst({ where: { email, code: otp } });
        if (!record)
            return { valid: false, message: "Invalid code" };
        if (record.expiresAt < new Date())
            return { valid: false, message: "Code expired" };
        await prisma.otp.delete({ where: { id: record.id } });
        return { valid: true };
    }
    static async sendPasswordResetOTP(email) {
        const otpcode = (0, generateOTP_1.generateOTP)();
        // Save OTP
        await prisma.otp.create({
            data: {
                email,
                code: otpcode,
                expiresAt: new Date(Date.now() + 5 * 60 * 1000),
            },
        });
        // Send email
        await mailer_1.mailer.sendMail({
            from: `Your App <${process.env.MAIL_USER}>`,
            to: email,
            subject: "Password Reset Code",
            html: `<p>Use this code to reset your password:</p><h2>${otpcode}</h2><p>This code expires in 5 minutes.</p>`,
        });
        return true;
    }
}
exports.OTPService = OTPService;
