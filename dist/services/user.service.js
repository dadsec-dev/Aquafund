"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class UserService {
    async createUser(data) {
        try {
            const user = await prisma.user.create({ data });
            return user;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("A user with the provided unique field already exists");
                }
            }
            throw error;
        }
    }
    async listUsers() {
        const users = await prisma.user.findMany({ orderBy: { createdAt: "desc" } });
        return users;
    }
    async getUserById(id) {
        const user = await prisma.user.findUnique({ where: { id } });
        return user;
    }
    async getUserByEmail(email) {
        return prisma.user.findUnique({ where: { email } });
    }
    async updateUser(id, data) {
        try {
            const updated = await prisma.user.update({ where: { id }, data });
            return updated;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new Error("User not found");
                }
                if (error.code === "P2002") {
                    throw new Error("Update would violate a unique constraint");
                }
            }
            throw error;
        }
    }
    async deleteUser(id) {
        try {
            const deleted = await prisma.user.delete({ where: { id } });
            return deleted;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new Error("User not found");
                }
            }
            throw error;
        }
    }
}
exports.default = new UserService();
