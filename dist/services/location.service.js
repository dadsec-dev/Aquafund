"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class LocationService {
    // POST - /api/locations
    async createLocation(data) {
        const location = await prisma.location.create({ data });
        return location;
    }
    // GET - /api/locations
    async listLocations(params) {
        const { city, state, country, search } = params ?? {};
        const where = {
            ...(city ? { city: { equals: city, mode: "insensitive" } } : {}),
            ...(state ? { state: { equals: state, mode: "insensitive" } } : {}),
            ...(country ? { country: { equals: country, mode: "insensitive" } } : {}),
            ...(search
                ? {
                    OR: [
                        { address: { contains: search, mode: "insensitive" } },
                        { city: { contains: search, mode: "insensitive" } },
                        { state: { contains: search, mode: "insensitive" } },
                        { country: { contains: search, mode: "insensitive" } },
                    ],
                }
                : {}),
        };
        const locations = await prisma.location.findMany({
            where,
            orderBy: [{ city: "asc" }, { state: "asc" }],
        });
        return locations;
    }
    // GET - /api/locations/:id
    async getLocationById(id) {
        const location = await prisma.location.findUnique({ where: { id } });
        return location;
    }
    // PUT - /api/locations/:id
    async updateLocation(id, data) {
        try {
            const updated = await prisma.location.update({ where: { id }, data });
            return updated;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error("Location not found");
            }
            throw error;
        }
    }
    // DELETE - /api/locations/:id
    async deleteLocation(id) {
        try {
            const deleted = await prisma.location.delete({ where: { id } });
            return deleted;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error("Location not found");
            }
            throw error;
        }
    }
}
exports.default = new LocationService();
