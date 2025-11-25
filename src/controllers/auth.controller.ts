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

  static async login(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const result = await AuthService.login(email, password);
      return res.json({ success: true, data: result });
    } catch (error: any) {
      return res.status(401).json({ success: false, error: error.message });
    }
  }

  static async forgotPassword(req: Request, res: Response) {
    try {
      const { email } = req.body;
      const msg = await AuthService.forgotPassword(email);
      return res.json({ message: msg });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }

  static async resetPassword(req: Request, res: Response) {
    try {
      const { email, otp, newPassword } = req.body;
      const msg = await AuthService.resetPassword(email, otp, newPassword);
      return res.json({ message: msg });
    } catch (error: any) {
      return res.status(400).json({ error: error.message });
    }
  }
}
