"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const user_service_1 = __importDefault(require("../services/user.service"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
class UserController {
    async create(req, res) {
        try {
            const { email, password, role } = req.body;
            if (!email || !password) {
                return res.status(400).json({ error: "Missing required fields." });
            }
            // Trim email and password
            const trimmedEmail = email.trim();
            const trimmedPassword = password.trim();
            // Hash password
            const salt = await bcryptjs_1.default.genSalt(10);
            const hashedPassword = await bcryptjs_1.default.hash(trimmedPassword, salt);
            const user = await user_service_1.default.createUser({
                email: trimmedEmail,
                password: hashedPassword,
                role: role || "NGO",
            });
            return res.status(201).json({ success: true, data: user });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create user" });
        }
    }
    async listUsers(req, res) {
        try {
            const users = await user_service_1.default.listUsers();
            return res.json({ success: true, data: users });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Failed to list users" });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const user = await user_service_1.default.getUserById(id);
            if (!user)
                return res.status(404).json({ success: false, message: "User not found" });
            return res.json({ success: true, data: user });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Failed to fetch user" });
        }
    }
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            if (data.password) {
                const salt = await bcryptjs_1.default.genSalt(10);
                data.password = await bcryptjs_1.default.hash(data.password.trim(), salt);
            }
            const updated = await user_service_1.default.updateUser(id, data);
            return res.json({ success: true, data: updated });
        }
        catch (error) {
            const message = error?.message === "User not found" ? error.message : "Failed to update user";
            const status = error?.message === "User not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
    async removeUser(req, res) {
        try {
            const { id } = req.params;
            const deleted = await user_service_1.default.deleteUser(id);
            return res.json({ success: true, data: deleted });
        }
        catch (error) {
            const message = error?.message === "User not found" ? error.message : "Failed to delete user";
            const status = error?.message === "User not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
}
exports.default = new UserController();
