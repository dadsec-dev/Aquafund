import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import userService from "../services/user.service";
import { createUserSchema } from "../utils/validation/user.validation";
import bcrypt from "bcryptjs";

class UserController {
    async create(req: Request, res: Response) {
        try {
            const { email, password, role } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Missing required fields." });
            }
            // Trim email and password
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            // Hash password
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(trimmedPassword, salt);
            const user = await userService.createUser({
                email: trimmedEmail,
                password: hashedPassword,
                role: role || "NGO",
            });

            return res.status(201).json({ success: true, data: user });

        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create user" });
        }
    }

    async listUsers(req: Request, res: Response) {
        try {
            const users = await userService.listUsers();
            // Format users to include ngo field (always present, null if no NGO)
            const formattedUsers = users.map((user: any) => {
                const { ngos, ...userWithoutNgos } = user;
                const response: any = userWithoutNgos;
                // Always include ngo field, set to null if user doesn't have NGOs
                if (user.role === "NGO") {
                    response.ngo = ngos && ngos.length > 0 ? ngos[0] : null;
                } else {
                    response.ngo = null;
                }
                return response;
            });
            return res.json({ success: true, data: formattedUsers });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to list users" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            if (!user) return res.status(404).json({ success: false, message: "User not found" });
            
            // Format user to include ngo field (always present, null if no NGO)
            const { ngos, ...userWithoutNgos } = user as any;
            const response: any = userWithoutNgos;
            // Always include ngo field, set to null if user doesn't have NGOs
            if (user.role === "NGO") {
                response.ngo = ngos && ngos.length > 0 ? ngos[0] : null;
            } else {
                response.ngo = null;
            }
            
            return res.json({ success: true, data: response });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to fetch user" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body as Prisma.UserUpdateInput;
            if (data.password) {
                const salt = await bcrypt.genSalt(10);
                data.password = await bcrypt.hash((data.password as string).trim(), salt);
            }
            const updated = await userService.updateUser(id, data);
            return res.json({ success: true, data: updated });
        } catch (error: any) {
            const message = error?.message === "User not found" ? error.message : "Failed to update user";
            const status = error?.message === "User not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }

    async removeUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await userService.deleteUser(id);
            return res.json({ success: true, data: deleted });
        } catch (error: any) {
            const message = error?.message === "User not found" ? error.message : "Failed to delete user";
            const status = error?.message === "User not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
}

export default new UserController();


