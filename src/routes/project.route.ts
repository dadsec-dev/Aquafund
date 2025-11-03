import { Router } from "express";
import projectController from "../controllers/project.controller";

const router = Router();

const {
  create: createProject,
  list: getAllProjects,
  getById: getProjectById,
  update: updateProject,
  changeStatus,
  remove: deleteProject,
} = projectController;

router.post("/", createProject);
router.get("/", getAllProjects);
router.get("/:id", getProjectById);
router.put("/:id", updateProject);
router.patch("/:id/status", changeStatus);
router.delete("/:id", deleteProject);

export default router;


