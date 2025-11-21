import { Request, Response } from "express";
import { AuthService } from "../services/auth.service";

export class AuthController {
  static async sendOTP(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const msg = await AuthService.sendVerificationEmail(email);
      return res.json({ message: msg });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async verifyOTP(req: Request, res: Response) {
    try {
      const { email, otp } = req.body;
      const msg = await AuthService.verifyAccount(email, otp);
      return res.json({ message: msg });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
