import { Router } from "express";
import projectController from "../controllers/project.controller";
import { requireAuth } from "../middleware/auth";
import { idParamSchema } from "../utils/params.validation";
import { validate } from "../utils/base.validation";
import { createProjectSchema, updateProjectSchema } from "../utils/project.validation";
const router = Router();

const {
  create: createProject,
  list: getAllProjects,
  getById: getProjectById,
  update: updateProject,
  changeStatus,
  remove: deleteProject,
} = projectController;

router.post("/projects", validate(createProjectSchema, "body"), createProject);
router.get("/projects", getAllProjects);

router.get("/projects/:id", validate(idParamSchema, "params"), getProjectById);
router.put("/projects/:id", validate(idParamSchema, "params"), validate(updateProjectSchema, "body"), updateProject);
router.patch("/projects/:id/status", validate(idParamSchema, "params"), validate(updateProjectSchema, "body"), changeStatus);
router.delete("/projects/:id", validate(idParamSchema, "params"), deleteProject);

export default router;

