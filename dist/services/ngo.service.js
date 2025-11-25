"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class NgoService {
    async createNgo(data) {
        try {
            return await prisma.nGO.create({ data });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("A NGO with the provided unique field already exists");
                }
            }
            throw error;
        }
    }
    async listNgos() {
        return prisma.nGO.findMany({ orderBy: { organizationName: "asc" } });
    }
    async getNgoById(id) {
        return prisma.nGO.findUnique({ where: { id } });
    }
    async updateNgo(id, data) {
        try {
            return await prisma.nGO.update({ where: { id }, data });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
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
    async deleteNgo(id) {
        try {
            return await prisma.nGO.delete({ where: { id } });
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new Error("NGO not found");
                }
            }
            throw error;
        }
    }
}
exports.default = new NgoService();
