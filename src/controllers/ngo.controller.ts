import { Request, Response } from "express";
import ngoService from "../services/ngo.service";

class NgoController {
    async create(req: Request, res: Response) {
        try {
            // Get authenticated user from JWT token (set by requireAuth middleware)
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }

            const data = req.body;
            // Automatically use authenticated user's ID
            const ngo = await ngoService.createNgo({
                ...data,
                userId: req.user.userId,
            });
            return res.status(201).json({ success: true, data: ngo });
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create NGO" });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const ngos = await ngoService.listNgos();
            return res.json({ success: true, data: ngos });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to list NGOs" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const ngo = await ngoService.getNgoById(id);
            if (!ngo) return res.status(404).json({ success: false, message: "NGO not found" });
            return res.json({ success: true, data: ngo });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to fetch NGO" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }

            const { id } = req.params;
            
            // Verify user owns this NGO or is ADMIN
            const existingNgo = await ngoService.getNgoById(id);
            if (!existingNgo) {
                return res.status(404).json({ success: false, message: "NGO not found" });
            }

            // Only allow update if user owns the NGO or is ADMIN
            if (existingNgo.userId !== req.user.userId && req.user.role !== "ADMIN") {
                return res.status(403).json({ success: false, message: "Forbidden - You can only update your own NGO" });
            }

            const data = req.body;
            const updated = await ngoService.updateNgo(id, data);
            return res.json({ success: true, data: updated });
        } catch (error: any) {
            const message = error?.message === "NGO not found" ? error.message : "Failed to update NGO";
            const status = error?.message === "NGO not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            if (!req.user) {
                return res.status(401).json({ success: false, message: "Unauthorized" });
            }

            const { id } = req.params;
            
            // Verify user owns this NGO or is ADMIN
            const existingNgo = await ngoService.getNgoById(id);
            if (!existingNgo) {
                return res.status(404).json({ success: false, message: "NGO not found" });
            }

            // Only allow delete if user owns the NGO or is ADMIN
            if (existingNgo.userId !== req.user.userId && req.user.role !== "ADMIN") {
                return res.status(403).json({ success: false, message: "Forbidden - You can only delete your own NGO" });
            }

            const deleted = await ngoService.deleteNgo(id);
            return res.json({ success: true, data: deleted });
        } catch (error: any) {
            const message = error?.message === "NGO not found" ? error.message : "Failed to delete NGO";
            const status = error?.message === "NGO not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
}

export default new NgoController();
