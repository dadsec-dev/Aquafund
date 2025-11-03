import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient, Prisma, Location } from "@prisma/client";

const prisma = new PrismaClient();

class LocationService {
    // POST - /api/locations
    async createLocation(data: Prisma.LocationCreateInput): Promise<Location> {
        const location = await prisma.location.create({ data });
        return location;
    }

    // GET - /api/locations
    async listLocations(params?: {
        city?: string;
        state?: string;
        country?: string;
        search?: string; // matches address/city/state
    }): Promise<Location[]> {
        const { city, state, country, search } = params ?? {};

        const where: Prisma.LocationWhereInput = {
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
    async getLocationById(id: string): Promise<Location | null> {
        const location = await prisma.location.findUnique({ where: { id } });
        return location;
    }

    // PUT - /api/locations/:id
    async updateLocation(id: string, data: Prisma.LocationUpdateInput): Promise<Location> {
        try {
            const updated = await prisma.location.update({ where: { id }, data });
            return updated;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error("Location not found");
            }
            throw error;
        }
    }

    // DELETE - /api/locations/:id
    async deleteLocation(id: string): Promise<Location> {
        try {
            const deleted = await prisma.location.delete({ where: { id } });
            return deleted;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error("Location not found");
            }
            throw error;
        }
    }
}

export default new LocationService();
