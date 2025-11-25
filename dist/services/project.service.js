"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const library_1 = require("@prisma/client/runtime/library");
const client_1 = require("@prisma/client");
const prisma = new client_1.PrismaClient();
class ProjectService {
    async createProject(data) {
        try {
            const project = await prisma.project.create({ data });
            return project;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("A project with the provided unique field already exists");
                }
            }
            throw error;
        }
    }
    async listProjects(params) {
        const { status, city, creatorId, search } = params ?? {};
        const where = {
            ...(status ? { status } : {}),
            ...(creatorId ? { creatorId } : {}),
            ...(search
                ? {
                    OR: [
                        { title: { contains: search, mode: "insensitive" } },
                        { description: { contains: search, mode: "insensitive" } },
                    ],
                }
                : {}),
            ...(city
                ? {
                    location: {
                        is: {
                            city: { equals: city, mode: "insensitive" },
                        },
                    },
                }
                : {}),
        };
        const projects = await prisma.project.findMany({
            where,
            orderBy: { createdAt: "desc" },
            include: { location: true },
        });
        return projects;
    }
    async getProjectById(id) {
        const project = await prisma.project.findUnique({
            where: { id },
            include: { location: true },
        });
        return project;
    }
    async updateProject(id, data) {
        try {
            const updated = await prisma.project.update({ where: { id }, data });
            return updated;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError) {
                if (error.code === "P2025") {
                    throw new Error("Project not found");
                }
                if (error.code === "P2002") {
                    throw new Error("Update would violate a unique constraint");
                }
            }
            throw error;
        }
    }
    async changeProjectStatus(id, status) {
        try {
            const updated = await prisma.project.update({ where: { id }, data: { status } });
            return updated;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error("Project not found");
            }
            throw error;
        }
    }
    async deleteProject(id) {
        try {
            const deleted = await prisma.project.delete({ where: { id } });
            return deleted;
        }
        catch (error) {
            if (error instanceof library_1.PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error("Project not found");
            }
            throw error;
        }
    }
}
exports.default = new ProjectService();
