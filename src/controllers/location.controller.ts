import { Request, Response } from "express";
import { Prisma } from "@prisma/client";
import locationService from "../services/location.service";

class LocationController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body as Prisma.LocationCreateInput;
            const location = await locationService.createLocation(data);
            return res.status(201).json({ success: true, data: location });
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create location" });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const { city, state, country, search } = req.query;
            const locations = await locationService.listLocations({
                city: city as string | undefined,
                state: state as string | undefined,
                country: country as string | undefined,
                search: search as string | undefined,
            });
            return res.json({ success: true, data: locations });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to list locations" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const location = await locationService.getLocationById(id);
            if (!location) return res.status(404).json({ success: false, message: "Location not found" });
            return res.json({ success: true, data: location });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to fetch location" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body as Prisma.LocationUpdateInput;
            const updated = await locationService.updateLocation(id, data);
            return res.json({ success: true, data: updated });
        } catch (error: any) {
            const message = error?.message === "Location not found" ? error.message : "Failed to update location";
            const status = error?.message === "Location not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await locationService.deleteLocation(id);
            return res.json({ success: true, data: deleted });
        } catch (error: any) {
            const message = error?.message === "Location not found" ? error.message : "Failed to delete location";
            const status = error?.message === "Location not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
}

export default new LocationController();


