import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient, Prisma, NGO } from "@prisma/client";

const prisma = new PrismaClient();

class NgoService {
    async createNgo(data: Prisma.NGOCreateInput): Promise<NGO> {
        try {
            return await prisma.nGO.create({ data });
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("A NGO with the provided unique field already exists");
                }
            }
            throw error;
        }
    }

    async listNgos(): Promise<NGO[]> {
        return prisma.nGO.findMany({ orderBy: { organizationName: "asc" } });
    }

    async getNgoById(id: string): Promise<NGO | null> {
        return prisma.nGO.findUnique({ where: { id } });
    }

    async updateNgo(id: string, data: Prisma.NGOUpdateInput): Promise<NGO> {
        try {
            return await prisma.nGO.update({ where: { id }, data });
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new Error("NGO not found");
                }
                if (error.code === "P2002") {
                    throw new Error("Update would violate a unique constraint");
                }
            }
            throw error;
        }
    }

    async deleteNgo(id: string): Promise<NGO> {
        try {
            return await prisma.nGO.delete({ where: { id } });
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new Error("NGO not found");
                }
            }
            throw error;
        }
    }
}

export default new NgoService();
