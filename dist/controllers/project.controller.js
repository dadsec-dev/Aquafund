"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const project_service_1 = __importDefault(require("../services/project.service"));
class ProjectController {
    // create a project
    async create(req, res) {
        try {
            const data = req.body;
            const project = await project_service_1.default.createProject(data);
            return res.status(201).json({ success: true, data: project });
        }
        catch (error) {
            return res.status(400).json({ success: false, message: error.message || "Failed to create project" });
        }
    }
    //lists all the projects
    async list(req, res) {
        try {
            const { status, city, creatorId, search } = req.query;
            const projects = await project_service_1.default.listProjects({
                status: status ? status : undefined,
                city: city,
                creatorId: creatorId,
                search: search,
            });
            return res.json({ success: true, data: projects });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Failed to list projects" });
        }
    }
    //get a project by Id
    async getById(req, res) {
        try {
            const { id } = req.params;
            const project = await project_service_1.default.getProjectById(id);
            if (!project)
                return res.status(404).json({ success: false, message: "Project not found" });
            return res.json({ success: true, data: project });
        }
        catch (error) {
            return res.status(500).json({ success: false, message: "Failed to fetch project" });
        }
    }
    //update a project by id
    async update(req, res) {
        try {
            const { id } = req.params;
            const data = req.body;
            const updated = await project_service_1.default.updateProject(id, data);
            return res.json({ success: true, data: updated });
        }
        catch (error) {
            const message = error?.message === "Project not found" ? error.message : "Failed to update project";
            const status = error?.message === "Project not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
    //update the status of the project
    async changeStatus(req, res) {
        try {
            const { id } = req.params;
            const { status } = req.body;
            const updated = await project_service_1.default.changeProjectStatus(id, status);
            return res.json({ success: true, data: updated });
        }
        catch (error) {
            const message = error?.message === "Project not found" ? error.message : "Failed to change status";
            const status = error?.message === "Project not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
    // delete a project
    async remove(req, res) {
        try {
            const { id } = req.params;
            const deleted = await project_service_1.default.deleteProject(id);
            return res.json({ success: true, data: deleted });
        }
        catch (error) {
            const message = error?.message === "Project not found" ? error.message : "Failed to delete project";
            const status = error?.message === "Project not found" ? 404 : 400;
            return res.status(status).json({ success: false, message });
        }
    }
}
exports.default = new ProjectController();
