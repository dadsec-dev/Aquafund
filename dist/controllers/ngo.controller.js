"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ngo_service_1 = __importDefault(require("../services/ngo.service"));
class NgoController {
    async create(req, res) {
        try {
            // Get authenticated user from JWT token (set by requireAuth middleware)
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
            const data = req.body;
            // Automatically use authenticated user's ID
            const ngo = await ngo_service_1.default.createNgo({
                ...data,
                userId: req.user.userId,
            });
            return res.status(201).json({ success: true, data: ngo });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create NGO" });
        }
    }
    async list(req, res) {
        try {
            const ngos = await ngo_service_1.default.listNgos();
            return res.json({ success: true, data: ngos });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Failed to list NGOs" });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const ngo = await ngo_service_1.default.getNgoById(id);
            if (!ngo)
                return res.status(404).json({ success: false, message: "NGO not found" });
            return res.json({ success: true, data: ngo });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Failed to fetch NGO" });
        }
    }
    async update(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
            const { id } = req.params;
            // Verify user owns this NGO or is ADMIN
            const existingNgo = await ngo_service_1.default.getNgoById(id);
            if (!existingNgo) {
                return res.status(404).json({ success: false, message: "NGO not found" });
            }
            // Only allow update if user owns the NGO or is ADMIN
            if (existingNgo.userId !== req.user.userId && req.user.role !== "ADMIN") {
                return res.status(403).json({ success: false, message: "Forbidden - You can only update your own NGO" });
            }
            const data = req.body;
            const updated = await ngo_service_1.default.updateNgo(id, data);
            return res.json({ success: true, data: updated });
        }
        catch (error) {
            const message = error?.message === "NGO not found" ? error.message : "Failed to update NGO";
            const status = error?.message === "NGO not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
    async remove(req, res) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }
            const { id } = req.params;
            // Verify user owns this NGO or is ADMIN
            const existingNgo = await ngo_service_1.default.getNgoById(id);
            if (!existingNgo) {
                return res.status(404).json({ success: false, message: "NGO not found" });
            }
            // Only allow delete if user owns the NGO or is ADMIN
            if (existingNgo.userId !== req.user.userId && req.user.role !== "ADMIN") {
                return res.status(403).json({ success: false, message: "Forbidden - You can only delete your own NGO" });
            }
            const deleted = await ngo_service_1.default.deleteNgo(id);
            return res.json({ success: true, data: deleted });
        }
        catch (error) {
            const message = error?.message === "NGO not found" ? error.message : "Failed to delete NGO";
            const status = error?.message === "NGO not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
}
exports.default = new NgoController();
