import { PrismaClientKnownRequestError } from "@prisma/client/runtime/library";
import { PrismaClient, Prisma, Project, ProjectStatus } from "@prisma/client";

const prisma = new PrismaClient();

class ProjectService {
    async createProject(data: Prisma.ProjectCreateInput): Promise<Project> {
        try {
            const project = await prisma.project.create({ data });
            return project;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
                if (error.code === "P2002") {
                    throw new Error("A project with the provided unique field already exists");
                }
            }
            throw error;
        }
    }

    async listProjects(params?: {
        status?: ProjectStatus;
        city?: string;
        creatorId?: string;
        search?: string;
    }): Promise<Project[]> {
        const { status, city, creatorId, search } = params ?? {};

        const where: Prisma.ProjectWhereInput = {
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

    async getProjectById(id: string): Promise<Project | null> {
        const project = await prisma.project.findUnique({
            where: { id },
            include: { location: true },
        });
        return project;
    }

    async updateProject(id: string, data: Prisma.ProjectUpdateInput): Promise<Project> {
        try {
            const updated = await prisma.project.update({ where: { id }, data });
            return updated;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError) {
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

    async changeProjectStatus(id: string, status: ProjectStatus): Promise<Project> {
        try {
            const updated = await prisma.project.update({ where: { id }, data: { status } });
            return updated;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error("Project not found");
            }
            throw error;
        }
    }

    async deleteProject(id: string): Promise<Project> {
        try {
            const deleted = await prisma.project.delete({ where: { id } });
            return deleted;
        } catch (error: unknown) {
            if (error instanceof PrismaClientKnownRequestError && error.code === "P2025") {
                throw new Error("Project not found");
            }
            throw error;
        }
    }
}
export default new ProjectService();
