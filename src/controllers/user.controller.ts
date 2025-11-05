import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import userService from "../services/user.service";
import { createUserSchema } from "../utils/validation/user.validation";


class UserController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body
            const { name, email, wallet, companyName } = data;

            if (!name || !email || !wallet || !companyName) {
                return res.status(400).json({ error: "Missing required fields." });
            }
            const user = await userService.createUser({
                name,
                email,
                wallet,
                companyName,
            });

            return res.status(201).json({ success: true, data: user });

        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create user" });
        }
    }

    async listUsers(req: Request, res: Response) {
        try {
            const users = await userService.listUsers();
            return res.json({ success: true, data: users });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to list users" });
        }
    }
 
    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const user = await userService.getUserById(id);
            if (!user) return res.status(404).json({ success: false, message: "User not found" });
            return res.json({ success: true, data: user });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to fetch user" });
        }
    }

    async updateUser(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body as Prisma.UserUpdateInput;
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


