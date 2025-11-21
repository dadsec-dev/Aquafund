import { Request, Response } from "express";
import ngoService from "../services/ngo.service";

class NgoController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body;
            const ngo = await ngoService.createNgo(data);
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
            const { id } = req.params;
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
            const { id } = req.params;
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
