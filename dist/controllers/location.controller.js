"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const location_service_1 = __importDefault(require("../services/location.service"));
class LocationController {
    async create(req, res) {
        try {
            const data = req.body;
            const location = await location_service_1.default.createLocation(data);
            return res.status(201).json({ success: true, data: location });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create location" });
        }
    }
    async list(req, res) {
        try {
            const { city, state, country, search } = req.query;
            const locations = await location_service_1.default.listLocations({
                city: city,
                state: state,
                country: country,
                search: search,
            });
            return res.json({ success: true, data: locations });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Failed to list locations" });
        }
    }
    async getById(req, res) {
        try {
            const { id } = req.params;
            const location = await location_service_1.default.getLocationById(id);
            if (!location)
                return res.status(404).json({ success: false, message: "Location not found" });
            return res.json({ success: true, data: location });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Failed to fetch location" });
        }
    }
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await location_service_1.default.updateLocation(id, data);
            return res.json({ success: true, data: updated });
        }
        catch (error) {
            const message = error?.message === "Location not found" ? error.message : "Failed to update location";
            const status = error?.message === "Location not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
    async remove(req, res) {
        try {
            const { id } = req.params;
            const deleted = await location_service_1.default.deleteLocation(id);
            return res.json({ success: true, data: deleted });
        }
        catch (error) {
            const message = error?.message === "Location not found" ? error.message : "Failed to delete location";
            const status = error?.message === "Location not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
}
exports.default = new LocationController();
