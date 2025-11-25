"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthController = void 0;
const auth_service_1 = require("../services/auth.service");
class AuthController {
    static async sendOTP(req, res) {
        try {
            const { email } = req.body;
            const msg = await auth_service_1.AuthService.sendVerificationEmail(email);
            return res.json({ message: msg });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    static async verifyOTP(req, res) {
        try {
            const { email, otp } = req.body;
            const msg = await auth_service_1.AuthService.verifyAccount(email, otp);
            return res.json({ message: msg });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    static async login(req, res) {
        try {
            const { email, password } = req.body;
            const result = await auth_service_1.AuthService.login(email, password);
            return res.json({ success: true, data: result });
        }
        catch (error) {
            return res.status(401).json({ success: false, error: error.message });
        }
    }
    static async forgotPassword(req, res) {
        try {
            const { email } = req.body;
            const msg = await auth_service_1.AuthService.forgotPassword(email);
            return res.json({ message: msg });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
    static async resetPassword(req, res) {
        try {
            const { email, otp, newPassword } = req.body;
            const msg = await auth_service_1.AuthService.resetPassword(email, otp, newPassword);
            return res.json({ message: msg });
        }
        catch (error) {
            return res.status(400).json({ error: error.message });
        }
    }
}
exports.AuthController = AuthController;
