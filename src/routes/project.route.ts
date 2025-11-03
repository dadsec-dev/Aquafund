import { Router } from "express";
import projectController from "../controllers/project.controller";

const router = Router();

router.post("/", (req, res) => projectController.create(req, res));
router.get("/", (req, res) => projectController.list(req, res));
router.get("/:id", (req, res) => projectController.getById(req, res));
router.put("/:id", (req, res) => projectController.update(req, res));
router.patch("/:id/status", (req, res) => projectController.changeStatus(req, res));
router.delete("/:id", (req, res) => projectController.remove(req, res));

export default router;


