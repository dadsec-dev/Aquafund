"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const project_controller_1 = __importDefault(require("../controllers/project.controller"));
const params_validation_1 = require("../utils/validation/params.validation");
const base_validation_1 = require("../utils/validation/base.validation");
const project_validation_1 = require("../utils/validation/project.validation");
const router = (0, express_1.Router)();
const { create: createProject, list: getAllProjects, getById: getProjectById, update: updateProject, changeStatus, remove: deleteProject, } = project_controller_1.default;
/**
 * @swagger
 * /api/v1/projects:
 *   post:
 *     summary: Create a new project
 *     tags: [Project]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - title
 *               - description
 *               - images
 *               - fundingGoal
 *               - creatorId
 *             properties:
 *               title:
 *                 type: string
 *                 example: "Smart Irrigation System"
 *               description:
 *                 type: string
 *                 example: "Automated IoT-based irrigation system to improve water efficiency."
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *                 example: ["https://example.com/image1.png", "https://example.com/image2.png"]
 *               fundingGoal:
 *                 type: number
 *                 example: 50000
 *               metadataHash:
 *                 type: string
 *                 nullable: true
 *                 example: "QmXo1h5Y923Nd8QpJf3fa9VtF8RkZKD32v5FQ1"
 *               creatorId:
 *                 type: string
 *                 example: "clx7f8392k3pa01q3v9b20d8c"
 *     responses:
 *       201:
 *         description: Project created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid project data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Missing required fields."
 *       500:
 *         description: Server error while creating project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
router.post("/projects", (0, base_validation_1.validate)(project_validation_1.createProjectSchema, "body"), createProject);
/**
 * @swagger
 * /api/v1/projects:
 *   get:
 *     summary: Retrieve all projects
 *     tags: [Project]
 *     responses:
 *       200:
 *         description: List of projects retrieved successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/Project'
 *       500:
 *         description: Failed to fetch projects
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
router.get("/projects", getAllProjects);
/**
 * @swagger
 * /api/v1/projects/{id}:
 *   get:
 *     summary: Get a project by ID
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "clx7p1e0d02nj0q45s7m5d9vn"
 *     responses:
 *       200:
 *         description: Project found
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       404:
 *         description: Project not found
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Project not found."
 *       500:
 *         description: Failed to retrieve project
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   example: "Internal server error."
 */
router.get("/projects/:id", (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), getProjectById);
/**
 * @swagger
 * /api/v1/projects/{id}:
 *   put:
 *     summary: Update project details
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "clx7p1e0d02nj0q45s7m5d9vn"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               images:
 *                 type: array
 *                 items:
 *                   type: string
 *               fundingGoal:
 *                 type: number
 *               metadataHash:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [PENDING, ACTIVE, COMPLETED, CANCELLED]
 *           example:
 *             title: "Updated Project Title"
 *             fundingGoal: 75000
 *     responses:
 *       200:
 *         description: Project updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Project'
 *       400:
 *         description: Invalid update payload
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to update project
 */
router.put("/projects/:id", (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), (0, base_validation_1.validate)(project_validation_1.updateProjectSchema, "body"), updateProject);
/**
 * @swagger
 * /api/v1/projects/{id}/status:
 *   patch:
 *     summary: Change project status
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "clx7p1e0d02nj0q45s7m5d9vn"
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [status]
 *             properties:
 *               status:
 *                 type: string
 *                 enum: [PENDING, ACTIVE, COMPLETED, CANCELLED]
 *                 example: "ACTIVE"
 *     responses:
 *       200:
 *         description: Project status updated
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to update status
 */
router.patch("/projects/:id/status", (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), (0, base_validation_1.validate)(project_validation_1.updateProjectSchema, "body"), changeStatus);
/**
 * @swagger
 * /api/v1/projects/{id}:
 *   delete:
 *     summary: Delete a project
 *     tags: [Project]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         example: "clx7p1e0d02nj0q45s7m5d9vn"
 *     responses:
 *       200:
 *         description: Project deleted successfully
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Project deleted."
 *       404:
 *         description: Project not found
 *       500:
 *         description: Failed to delete project
 */
router.delete("/projects/:id", (0, base_validation_1.validate)(params_validation_1.idParamSchema, "params"), deleteProject);
/**
 * @swagger
 * components:
 *   schemas:
 *     Project:
 *       type: object
 *       properties:
 *         id:
 *           type: string
 *         title:
 *           type: string
 *         description:
 *           type: string
 *         images:
 *           type: array
 *           items:
 *             type: string
 *         fundingGoal:
 *           type: number
 *         raisedAmount:
 *           type: number
 *         status:
 *           type: string
 *           enum: [PENDING, ACTIVE, COMPLETED, CANCELLED]
 *         metadataHash:
 *           type: string
 *           nullable: true
 *         createdAt:
 *           type: string
 *           format: date-time
 *         updatedAt:
 *           type: string
 *           format: date-time
 *         creatorId:
 *           type: string
 *         locationId:
 *           type: string
 *           nullable: true
 */
exports.default = router;
