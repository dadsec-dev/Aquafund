import { Request, Response } from "express";
import { Prisma, ProjectStatus } from "@prisma/client";
import projectService from "../services/project.service";

class ProjectController {
    async create(req: Request, res: Response) {
        try {
            const data = req.body as Prisma.ProjectCreateInput;
            const project = await projectService.createProject(data);
            return res.status(201).json({ success: true, data: project });
        } catch (error: any) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create project" });
        }
    }

    async list(req: Request, res: Response) {
        try {
            const { status, city, creatorId, search } = req.query;
            const projects = await projectService.listProjects({
                status: status ? (status as ProjectStatus) : undefined,
                city: city as string | undefined,
                creatorId: creatorId as string | undefined,
                search: search as string | undefined,
            });
            return res.json({ success: true, data: projects });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to list projects" });
        }
    }

    async getById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const project = await projectService.getProjectById(id);
            if (!project) return res.status(404).json({ success: false, message: "Project not found" });
            return res.json({ success: true, data: project });
        } catch (error: any) {
            return res.status(500).json({ success: false, message: "Failed to fetch project" });
        }
    }

    async update(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const data = req.body as Prisma.ProjectUpdateInput;
            const updated = await projectService.updateProject(id, data);
            return res.json({ success: true, data: updated });
        } catch (error: any) {
            const message = error?.message === "Project not found" ? error.message : "Failed to update project";
            const status = error?.message === "Project not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }

    async changeStatus(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const { status } = req.body as { status: ProjectStatus };
            const updated = await projectService.changeProjectStatus(id, status);
            return res.json({ success: true, data: updated });
        } catch (error: any) {
            const message = error?.message === "Project not found" ? error.message : "Failed to change status";
            const status = error?.message === "Project not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }

    async remove(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const deleted = await projectService.deleteProject(id);
            return res.json({ success: true, data: deleted });
        } catch (error: any) {
            const message = error?.message === "Project not found" ? error.message : "Failed to delete project";
            const status = error?.message === "Project not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
}

export default new ProjectController();


